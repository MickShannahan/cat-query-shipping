import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class ShipmentsService {
  async create(body) {
    logger.log(body)
    const shipment = await dbContext.Shipments.create(body)
    return await shipment
  }

  async getAll(query = {}) {
    Object.keys(query).forEach(k => {
      if (typeof query[k] === 'string' && query[k].startsWith('/')) {
        const expression = query[k].split('/')
        query[k] = { $regex: new RegExp(expression[1], expression[2]) }
      }
    })
    const shipments = await dbContext.Shipments.find(query).limit(50).set('-missingProperties -damagedPropertied -damagedKeys')
    return { hits: shipments.length, results: shipments }
  }

  async searchMissingShipments(query) {
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
}

export const shipmentsService = new ShipmentsService()
