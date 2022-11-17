import { itemsService } from '../services/ItemsService.js'
import { _checkAdmin } from '../utils/AccountValidator.js'
import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/roll', this.roll)
      .get('/buy/:id', this.buy)
      .get('/craft/:id', this.craft)
      .delete('/scrap/:id')
      .use(_checkAdmin)
      .get('', this.find)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async buy(req, res, next) {
    try {
      const item = await itemsService.buy(req.params.id, req.userInfo)
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async craft(req, res, next) {
    try {
      const item = await itemsService.craft(req.params.id, req.userInfo)
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async roll(req, res, next) {
    try {
      const item = await itemsService.roll(req.userInfo)
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async scrap(req, res, next) {
    try {
      const message = await itemsService.scrap(req.params.id, req.userInfo)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
  // Shop find

  async find(req, res, next) {
    try {
      const items = await itemsService.find()
      return res.send(items)
    } catch (error) {
      next(error)
    }
  }

  // Admin actions

  async create(req, res, next) {
    try {
      const item = await itemsService.create(req.body)
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const item = await itemsService.update(req.body)
      return res.send(item)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const message = await itemsService.remove(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}