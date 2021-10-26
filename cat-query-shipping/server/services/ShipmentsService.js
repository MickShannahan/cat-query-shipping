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
    query = regexr(query)
    const shipments = await dbContext.Shipments.find(query).limit(50).set('-missingProperties -damagedPropertied -damagedKeys')
    return { hits: shipments.length, results: shipments }
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
    const value = await dbContext.Shipments.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value.toObject()
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
