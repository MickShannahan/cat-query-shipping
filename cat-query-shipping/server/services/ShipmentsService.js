import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
import { modsService } from './ModsService.js'

class ShipmentsService {
  async create(body) {
    // logger.log(body)
    const shipment = await dbContext.Shipments.create(body)
    return await shipment
  }

  // Finds based off query
  async getAll(query = {}, userId) {
    query = regexr(query) // converts rg in body to new Regex
    const account = await dbContext.Account.findById(userId).populate('lostShipment')
    const limit = await modsService.getPageLimit(account)
    logger.log('page limit', limit)
    const count = await dbContext.Shipments.count(query)

    const modUsed = await modsService.checkForSave(count, limit, account)
    if (modUsed) return modUsed // if fused blown return it

    const shipments = await dbContext.Shipments.find(query).limit(limit)
    accountService.updateAccountStats(userId, { pages: shipments.length, requests: 1 }, true)

    // IF not glitched
    if (!account.lostShipment.glitch || count > 5) {
      return { hits: count, results: shipments }
    }
    // glitched packages always return a fixed amount
    const glitchedCount = account.lostShipment.glitchData.extraResults || 5
    const extra = await dbContext.Shipments.find({ $xor: [...Object.keys(query).map(k => { return { [k]: query[k] } }).sort(randSort), ...Object.keys(account.lostShipment).map(k => { return { [k]: account.lostShipment[k] } }).sort(randSort)] }).limit(glitchedCount - shipments.length)
    return { hits: shipments.length + extra.length, results: [...shipments, ...extra].sort(randSort) }
  }

  async getCount(query = {}) {
    const count = await dbContext.Shipments.count({ ...query, found: false })
    return { count }
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

function randSort() {
  return Math.random() - 0.5
}

export const shipmentsService = new ShipmentsService()
