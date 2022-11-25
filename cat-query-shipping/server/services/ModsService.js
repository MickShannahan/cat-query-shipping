import { logger } from '../utils/Logger.js'
import { itemsService } from './ItemsService.js'

class ModsService {
  getPageLimit(account) {
    let limit = 50
    const reducers = account.installedMods.filter(m => m.action === 'reduce_pages')
    // eslint-disable-next-line prefer-const
    let reduceLimit = reducers.reduce((acc, cur) => acc + cur.data.count, 0)
    limit -= reduceLimit
    if (limit <= 0) limit = 5
    // TODO calculate account limit
    return limit
  }

  async checkForSave(count, limit, account) {
    if (count > limit) {
      const mod = account.installedMods.find(m => m.action === 'safe_search' && m.data.count > 0)
      if (mod) {
        mod.data.count--
        itemsService.saveMods(account.installedMods, account)
        return { action: 'fuse_blown', data: mod, hits: count }
      }
    }
    return false
  }

  async resetMods(account) {
    const mods = account.installedMods
    mods.forEach(m => {
      if (m.data.count !== undefined && m.data.maxCount) m.data.count = m.data.maxCount
    })
    await itemsService.saveMods(mods, account, false)
  }
}

export const modsService = new ModsService()
