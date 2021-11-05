import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class ProfilesService{

async getProfiles(){
  let res = await api.get('api/profiles')
  logger.log(res.data)
  AppState.profiles = res.data
}


}

export const profilesService = new ProfilesService()
