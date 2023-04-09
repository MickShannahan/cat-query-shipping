import { accountService } from '../services/AccountService.js'
import { awardsService } from '../services/AwardService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/awards', this.getProfileAwards)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getProfileAwards(req, res, next) {
    try {
      const awards = await awardsService.getAwardsByAccountId(req.params.id)
      return res.send(awards)
    } catch (error) {
      next(error)
    }
  }
}
