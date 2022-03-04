import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
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
    return shipment[0].toObject()
  }

  async checkShipmentAnswer(userId, shipmentId) {
    const account = await dbContext.Account.findById(userId)
    logger.log(shipmentId, account.lostShipmentId.toString())
    // IF Correct
    if (shipmentId === account.lostShipmentId.toString()) {
      const shipment = await shipmentsService.getById(shipmentId)
      shipment.found = true; shipment.save()
      account.shipmentsFound.push(shipmentId)
      account.currentGuesses = []
      account.credits += shipment.creditsWorth
      accountService.updateAccountStats(userId, { pages: 0, requests: 0, averagePages: account.currentPagesPrinted, averageRequests: account.currentRequestsMade })
      account.currentPagesPrinted = 0
      account.currentRequestsMade = 0
      await account.save()
      logger.log('correct guess', shipment, account)
      socketProvider.messageRoom('GENERAL', 'shipment:found', account)
      accountService.updateGrade(account.id)
      return { result: true, currentGuesses: account.currentGuesses, shipment: shipment }
    } else { // INCORRECT
      account.currentGuesses.push(shipmentId)
      await account.save()
      return { result: false, currentGuesses: account.currentGuesses, shipment: null }
    }
  }
}

export const gameService = new GameService()
