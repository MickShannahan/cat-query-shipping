import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext.js'
import { AccountSchema } from '../models/Account.js'
import { accountService } from '../services/AccountService'
import { gameService } from '../services/GameService'
import { shipmentsService } from '../services/ShipmentsService'
import { _checkAdmin } from '../utils/AccountValidator.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/lostshipment/answer/:id', this.checkShipmentAnswer)
      .get('/shipment', this.getAccountShipment)
      .put('', this.editAccount)
      .use(_checkAdmin)
    // .put('/update', this.updateMany)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getPrivateAccount(req.userInfo)
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
      if (shipment.glitch && process.env.NODE_ENV !== 'dev') {
        shipment = await gameService.getLostShipment({}, account)
      }
      return res.send(shipment)
    } catch (error) {
      next(error)
    }
  }

  async updateMany(req, res, next) {
    try {
      const objectsToUpdate = await dbContext.Account.find({
        createdAt: {
          $lte: new Date((new Date().getTime() - (5 * 24 * 60 * 60 * 1000)))
        }
      })

      const bulkOps = objectsToUpdate.map(obj => {
        return {
          updateOne: {
            filter: {
              _id: obj._id
            },
            // If you were using the MongoDB driver directly, you'd need to do
            // `update: { $set: { field: ... } }` but mongoose adds $set for you
            update: {
              totalCredits: Math.round(obj.credits),
              leaderScore: Math.round(obj.credits + (obj.shipmentsFound.length * 50))
            }
          }
        }
      })

      logger.log('updated', bulkOps)
      await dbContext.Account.bulkWrite(bulkOps)
      res.send(objectsToUpdate)
    } catch (error) {
      next(error)
    }
  }
}
