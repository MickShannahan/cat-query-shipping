import { Auth0Provider } from '@bcwdev/auth0provider'
import { RandomShipment } from '../models/Shipment'
import { gameService } from '../services/GameService'
import { shipmentsService } from '../services/ShipmentsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

function cleanQuery(query) {
  delete query._id
  delete query.id
  delete query.description
}
export class ShipmentsController extends BaseController {
  constructor() {
    super('api/shipments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/search', this.searchLostShipments)
      .get('/bell', this.getBell)
      .post('/query', this.runQuery)
      .get('/lost', this.getLostShipment)
      .post('/:number', this.createThousand)
      .post('', this.createShipment)
  }

  async getAll(req, res, next) {
    try {
      cleanQuery(req.query)
      logger.log('get all Q', req.query)
      const user = req.userInfo
      const shipments = await shipmentsService.getAll(req.query, user.id)
      return res.send(shipments)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  // get random lost Shipment for the user
  async getLostShipment(req, res, next) {
    try {
      const user = req.userInfo
      const shipment = await gameService.getLostShipment(req.query, user)
      return res.send(shipment)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async searchLostShipments(req, res, next) {
    try {
      const shipments = await shipmentsService.searchLostShipments(req.query)
      return res.send(shipments)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async createShipment(req, res, next) {
    try {
      req.body = new RandomShipment()
      const shipment = await shipmentsService.create(req.body)
      return res.send(shipment)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async createThousand(req, res, next) {
    try {
      const count = parseInt(req.params.number)
      // 2,   2,   2,   5,   5,   6,    6,  7,   7,   8,  8,   7,   7,   6,  6, 5,5,2 ,2 ,2
      const curve =
      [0.02, 0.03, 0.06, 0.11, 0.16, 0.22, 0.28, 0.35, 0.42, 0.5, 0.58, 0.65, 0.72, 0.78, 0.84, 0.89, 0.94, 0.96, 0.98, 0.99]
      for (let i = 0; i < count; i++) {
        const shipment = new RandomShipment(curve.findIndex(c => c >= i / count) + 1)
        await shipmentsService.create(shipment)
      }
      return res.send('done')
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async getBell(req, res, next) {
    try {
      const results = shipmentsService.getBell()
      return res.send(results)
    } catch (error) {
      next(error)
    }
  }

  async runQuery(req, res, next) {
    try {
      logger.log('query', req.body)
      const user = req.userInfo
      const shipments = await shipmentsService.getAll(req.body, user.id)
      return res.send(shipments)
    } catch (error) {
      next(error)
    }
  }
}
