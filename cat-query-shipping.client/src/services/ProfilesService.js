import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class ProfilesService {

  async getProfiles() {
    let res = await api.get('api/profiles')
    logger.log(res.data)
    AppState.profiles = res.data
    this.getLeaderAwards(AppState.profiles[0].id)
  }

  async getLeaderAwards(profileId) {
    AppState.leaderAwards = []
    const res = await api.get(`api/profiles/${profileId}/awards`)
    AppState.leaderAwards = res.data
  }


}

export const profilesService = new ProfilesService()
