import { AppState } from "../AppState.js"
import { Mod } from "../models/Mod.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class ModsService {

  findMod(action, type) {
    const mod = AppState.account.installedMods?.find(m => {
      return m.action == action || m.type == type
    })
    return mod
  }
  useMod(id) {
    const mod = AppState.account.installedMods?.find(m => m.id == id)
    if (mod.data.count && mod.data.count > 0) {
      let uses = mod.data.uses || 1
      mod.data.count -= uses
      if (mod.data.count <= 0) mod.burnt = true
    } else {
      Pop.toast(`${mod.name} is burnt out.`, 'error', 'center-start')
      return false
    }
    return mod
  }
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

  async removeMod(id) {
    try {
      const res = await api.delete('api/items/mods/remove/' + id)
      logger.log('[remove mod]', res.data)
      AppState.account.installedMods = AppState.account.installedMods.filter(m => m.id != id)
    } catch (error) {
      Pop.error(error.message)
      logger.error(error)
    }
  }
}

export const modsService = new ModsService()
