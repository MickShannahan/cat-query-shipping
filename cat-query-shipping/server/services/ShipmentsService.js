import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'

class ShipmentsService {
  async create(body) {
    // logger.log(body)
    const shipment = await dbContext.Shipments.create(body)
    return await shipment
  }

  async getAll(query = {}, userId) {
    query = regexr(query)
    const shipments = await dbContext.Shipments.find(query)
    accountService.updateAccountStats(userId, { pages: shipments.length > 50 ? 50 : shipments.length, requests: 1 })
    return { hits: shipments.length, results: shipments.slice(0, 49) }
  }

  async searchLostShipments(query) {
    const shipments = await dbContext.Shipments.find(query)
    logger.log(shipments)
    return {
      hits: shipments.length,
      results: shipments.map(s => s.toObject())
    }
  }

  async getById(id) {
    const value = await dbContext.Shipments.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }

  async getLostById(id) {
    const shipment = await dbContext.Shipments.findById(id)
    if (!shipment) {
      throw new BadRequest('Invalid Id')
    }
    return shipment.toObject()
  }

  async getBell() {
    for (let i = 1; i <= 20; i++) {
      logger.log(`DR:${i}- ${await dbContext.Shipments.count({ difficultyRating: i })}`)
    }
    return 'check server console'
  }
}

function regexr(object) {
  logger.log(object)
  Object.keys(object).forEach(k => {
    if (k === '$regex' && object[k].startsWith('/')) {
      const expression = object[k].split('/')
      object[k] = new RegExp(expression[1], expression[2])
    }
    if (typeof object[k] === 'object' && Object.keys(object[k]).length > 0) {
      object[k] = regexr(object[k])
    }
  })
  return object
}

export const shipmentsService = new ShipmentsService()
