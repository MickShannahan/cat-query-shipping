import { dbContext } from '../db/DbContext.js'

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

class ProfileService {
  /**
    * Returns a user profile from its id
    * @param {string} id
   */
  async getProfileById(id) {
    const profile = await dbContext.Profiles.findById(id)
    return profile
  }

  /**
    * Returns a list user profiles from a query search of name likeness
    * limits to first 20 without offset
    * @param {string} name
   */
  async findProfiles(name = '', offset = 0) {
    const regx = new RegExp(name, 'ig')
    const profiles = await dbContext.Profiles.find({ name: { $regex: regx } }).sort({ leaderScore: -1, totalCredits: -1 }).limit(100).populate('favoriteCollectable')
    return profiles
  }

  async findEmployeesOfMonth() {
    const profiles = dbContext.Profiles.find({})
  }
}

export const profileService = new ProfileService()
