import { Auth0Provider } from '@bcwdev/auth0provider'
import { RandomShipment } from '../models/Shipment'
import { gameService } from '../services/GameService'
import { shipmentsService } from '../services/ShipmentsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ShipmentsController extends BaseController {
  constructor() {
    super('api/shipments')
    this.router
      .get('', this.getAll)
      .get('/search', this.searchLostShipments)
      .post('/query', this.runQuery)
      .post('/:number', this.createThousand)
      .post('', this.createShipment)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/lost', this.getLostShipment)
  }

  async getAll(req, res, next) {
    try {
      const shipments = await shipmentsService.getAll(req.query)
      return res.send(shipments)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  // get random lost Shipment for the user
  async getLostShipment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const shipment = await gameService.getLostShipment(req.query, userId)
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
      for (let i = 0; i < parseInt(req.params.number); i++) {
        const shipment = new RandomShipment()
        await shipmentsService.create(shipment)
      }
      return res.send('done')
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async runQuery(req, res, next) {
    try {
      logger.log('query', req.body)
      const shipments = await shipmentsService.getAll(req.body)
      return res.send(shipments)
    } catch (error) {
      next(error)
    }
  }
}
