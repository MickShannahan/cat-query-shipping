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
      .put('', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(account)
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
      if (!account.lostShipmentId) {
        await gameService.getLostShipment({}, req.userInfo)
      }
      let shipment = await shipmentsService.getLostById(account.lostShipmentId)
      if (shipment.glitch) {
        shipment = await gameService.getLostShipment({}, account)
      }
      return res.send(shipment)
    } catch (error) {
      next(error)
    }
  }
}
