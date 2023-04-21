import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class CollectablesService {

  async addCollectable(item) {
    try {
      const res = await api.post('api/items/collectables/equip', item)
      AppState.collectables.push(res.data)
    } catch (error) {
      Pop.error(error)
    }
  }

  async removeCollectable(itemId) {
    try {
      const res = await api.delete('api/items/collectables/remove/' + itemId)
      let index = AppState.collectables.findIndex(c => c.id == itemId)
      AppState.collectables.splice(index, 1)
    } catch (error) {
      Pop.error(error)
    }
  }

  async saveCollectables() {
    try {
      let collectables = AppState.collectables
      const res = await api.put(`api/items/collectables/save`, collectables)
    } catch (error) {
      Pop.error(error)
    }
  }

}

export const collectablesService = new CollectablesService()
