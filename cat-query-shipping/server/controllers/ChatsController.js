import { Auth0Provider } from '@bcwdev/auth0provider'
import { chatsService } from '../services/ChatsService'
import { _checkAdmin } from '../utils/AccountValidator'
import BaseController from '../utils/BaseController'

export class ChatsController extends BaseController {
  constructor() {
    super('api/chats')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(_checkAdmin)
      .get('', this.getAll)
      .get('/:query', this.getOne)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const chats = await chatsService.getAll(req.params.query)
      return res.send(chats)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const chat = await chatsService.getOne(req.params.id)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const chat = await chatsService.create(req.body)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      const chat = await chatsService.update(req.body)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const message = await chatsService.remove(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
