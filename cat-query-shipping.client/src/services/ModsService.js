import { AppState } from "../AppState.js"
import { Mod } from "../models/Mod.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class ModsService {
  async addMod(id) {
    const res = await api.post('api/items/mods/equip', { _id: id })
    logger.log('[Add Mod]', res.data)
    AppState.account.installedMods.unshift(new Mod(res.data))
  }

  async updateMods() {
    try {
      let mods = AppState.account.installedMods
      const res = await api.put('api/items/mods/save', mods)
      logger.log('[Update mods]', res.data)
    } catch (error) {
      Pop.error(error.message)
      logger.error(error)
    }
  }
}

export const modsService = new ModsService()
