import { Auth0Provider } from '@bcwdev/auth0provider'
import { RandomShipment } from '../models/Shipment'
import { shipmentsService } from '../services/ShipmentsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ShipmentsController extends BaseController {
  constructor() {
    super('api/shipments')
    this.router
      .get('', this.getAll)
      .get('/missing', this.getMissingShipment)
      .get('/search', this.searchMissingShipments)
      .post('/query', this.runQuery)
      .post('/1000', this.createThousand)
      .post('', this.createShipment)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .use(generateShipment)
  }

  async getAll(req, res, next) {
    try {
      const shipments = await shipmentsService.getAll(req.query)
      return res.send({
        unionNotes: '[^  .  ^]',
        shipments
      })
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async getMissingShipment(req, res, next) {
    try {
      const shipment = await shipmentsService.getMissingShipment(req.query)
      return res.send(shipment)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async searchMissingShipments(req, res, next) {
    try {
      const shipments = await shipmentsService.searchMissingShipments(req.query)
      return res.send(shipments)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async createShipment(req, res, next) {
    try {
      const shipment = await shipmentsService.create(req.body)
      return res.send(shipment)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async createThousand(req, res, next) {
    try {
      for (let i = 0; i < 999; i++) {
        const shipment = new RandomShipment()
        shipment.lostProps(shipment)
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

async function generateShipment(req, res, next) {
  try {
    const shipment = new RandomShipment()
    shipment.lostProps(shipment)
    req.body = shipment
    return next()
  } catch (error) {
    logger.log(error)
    return next(error)
  }
}
