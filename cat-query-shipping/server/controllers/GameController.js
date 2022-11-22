import { gameService } from '../services/GameService.js'
import { _checkAdmin } from '../utils/AccountValidator.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService.js'

export class GameController extends BaseController {
  constructor() {
    super('api/game')
    this.router
      .get('/shop', this.getShop)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/shop/buy/:id', this.buyItem)
      .use(_checkAdmin)
      .post('/shop', this.createShop)
  }

  async createShop(req, res, next) {
    return res.send(await gameService.createShop(req.body))
  }

  async getShop(req, res, next) {
    try {
      const items = await gameService.getShop()
      return res.send(items)
    } catch (error) {
      next(error)
    }
  }

  async buyItem(req, res, next) {
    try {
      if (req.params.id !== 'random') {
        return res.send(await itemsService.buyItem(req.params.id, req.userInfo.id))
      }
      return res.send(await itemsService.roll(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
