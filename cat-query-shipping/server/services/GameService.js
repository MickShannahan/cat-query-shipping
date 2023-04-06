import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'
import { BadRequest } from '../utils/Errors.js'
import { random } from '../utils/Generators.js'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
import { modsService } from './ModsService.js'
import { shipmentsService } from './ShipmentsService'
class GameService {
  async getLostShipment(query = {}, user) {
    logger.log('new ls query:', query)
    const account = await accountService.getAccount(user)
    // get number of shipments based on account grade
    let range = { $and: [{ difficultyRating: { $gte: account.minDifficulty } }, { difficultyRating: { $lte: account.maxDifficulty } }, { found: false }, query] }
    let numberOfShipments = await dbContext.Shipments.count(range)
    // make sure sufficient shipments exist
    logger.log('new ls #of ships:', numberOfShipments)
    if (numberOfShipments < 10) {
      range = { $and: [{ found: false }, query] }
      numberOfShipments = await dbContext.Shipments.count(range)
    }
    // get shipment
    const randShipment = Math.floor(Math.random() * (numberOfShipments - 1))
    const shipment = await dbContext.Shipments.find(range).limit(1).skip(randShipment)
    account.lostShipmentId = shipment[0]._id
    account.save()
    // recover props based on mods
    const lost = await shipment[0].toObject()
    await modsService.recoverShipmentData(shipment[0], lost, account)
    return lost
  }

  // abandons shipment then gets a new one
  async abandonShipment(query = {}, user) {
    const account = await accountService.getAccount(user)
    const shipment = await dbContext.Shipments.findById(account.lostShipmentId)
    
    if (shipment) { // thanks Joe ☕
      const abandonCost = Math.floor(shipment.creditsWorth / 3)
      if (account.credits <= abandonCost) throw new BadRequest('Not enough credits to abandon this shipment.')
      account.credits -= abandonCost
      shipment.creditsWorth += Math.round(abandonCost / 2)
      await account.save()
      await shipment.save()
    }
    const newShipment = await this.getLostShipment(query, user)
    return newShipment
  }

  // check for when user clicks on manifest to guess
  async checkShipmentAnswer(userId, shipmentId) {
    const account = await dbContext.Account.findById(userId)
    logger.log(shipmentId, account.lostShipmentId.toString())

    // IF Correct
    if (shipmentId === account.lostShipmentId.toString()) {
      const shipment = await shipmentsService.getById(shipmentId)
      shipment.found = true; shipment.save()
      socketProvider.messageRoom('GENERAL', 'shipment:found', account)

      const creds = _payOut(account, shipment)
      account.credits += creds; account.totalCredits += creds
      await accountService.updateAccountScore(account)
      await accountService.updateAccountHistory(account)
      await accountService.zeroAccountStats(account)
      await accountService.advanceGrade(account)
      await modsService.resetMods(account)
      await account.save()

      return { result: true, currentGuesses: account.currentGuesses, shipment: shipment }
    } else {
      // INCORRECT
      account.currentGuesses.push(shipmentId)
      await account.save()
      return { result: false, currentGuesses: account.currentGuesses, shipment: null }
    }
  }

  async getShop() { // get the shop or refresh the shop
    const shopRefresh = process.env.NODE_ENV === 'dev' ? 3 : 15
    const shop = await dbContext.Shops.findOne()
    if (new Date().getTime() - new Date(shop.updatedAt).getTime() > 1000 * 60 * shopRefresh) {
      const items = await this.refreshShop(shop.itemsForSale)
      shop.itemsForSale = items
      await shop.save()
    }
    await shop.populate('itemsForSale')
    return shop
  }

  async refreshShop(items) {
    const ultraRare = Math.random() < 0.7 ? { rarity: { $not: /ultra-rare/ } } : {}
    const all = await dbContext.Items.find({ $and: [{ type: 'mod' }, { rarity: { $not: /secret-rare/ } }, ultraRare] })
    let ids = all.map(i => i._id.toString())
    const item1 = random(ids)
    ids = ids.filter(i => i !== item1)
    const item2 = random(ids)
    ids = ids.filter(i => i !== item2)
    const item3 = random(ids)
    return [item1, item2, item3]
  }

  async createShop(body) { // on to be used for shop setup or special events
    let shop = await dbContext.Shops.findOne()
    if (shop) {
      shop = await dbContext.Shops.findByIdAndUpdate(shop._id, body)
    } else {
      shop = await dbContext.Shops.create(body)
    }
    await shop.populate('itemsForSale')
    return shop
  }
}

export const gameService = new GameService()

function _payOut(account, shipment) {
  // TODO add mods to increase payout
  const firstGuessBonus = account.currentGuesses.length ? 0 : Math.round(shipment.difficultyRating * 4.5)
  return shipment.creditsWorth + firstGuessBonus
}
