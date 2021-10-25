import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
class GameService {
  async getLostShipment(query = {}, userId) {
    const account = await accountService.getAccount({ id: userId })
    const numberOfShipments = await dbContext.Shipments.count(query)
    const randShipment = Math.floor(Math.random() * (numberOfShipments - 1))
    const shipment = await dbContext.Shipments.find().limit(1).skip(randShipment)

    // FIXME need a way to check if user has gotten shipment before

    // if (!account.foundLostShipments.includes(s => s._id.toString() === shipment._id.toString())) {
    //   await accountService.setLostShipment(userId, shipment[0]._id)
    // } else {
    //   logger.log('duplicate Shipment for user', account.name)
    //   shipment = [await this.getLostShipment({}, userId)]
    // }
    return shipment[0].toObject()
  }

  async checkShipmentAnswer(userId, shipmentId) {
    const account = await dbContext.Account.findById(userId)
    logger.log(shipmentId, account.lostShipmentId.toString())
    if (shipmentId === account.lostShipmentId.toString()) {
      account.shipmentsFound.push(shipmentId)
      account.currentGuesses = []
      await account.save()
      return { result: true, currentGuesses: account.currentGuesses }
    } else {
      account.currentGuesses.push(shipmentId)
      await account.save()
      return { result: false, currentGuesses: account.currentGuesses }
    }
  }
}

export const gameService = new GameService()
