import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { gameService } from '../services/GameService'
import { shipmentsService } from '../services/ShipmentsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/lostshipment/answer/:id', this.checkShipmentAnswer)
      .get('/shipment', this.getAccountShipment)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async checkShipmentAnswer(req, res, next) {
    try {
      const result = await gameService.checkShipmentAnswer(req.userInfo.id, req.params.id)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async getAccountShipment(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      const shipment = await shipmentsService.getLostById(account.lostShipmentId.toString())
      return res.send(shipment)
    } catch (error) {
      next(error)
    }
  }
}
