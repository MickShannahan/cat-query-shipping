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

  async recoverShipmentData(shipment, lostShipment, account) {
    const recoveredData = {}
    const recoveryMods = account.installedMods.filter(m => m.action === 'recover_data')
    const damagedKeys = Object.keys(shipment.damagedKeys)
    const damagedProperties = Object.keys(shipment.damagedProperties)
    const missingProperties = shipment.missingProperties
    logger.log('recovering', shipment.recipient, recoveryMods)
    recoveryMods.forEach(m => {
      const mod = m.data
      if (mod.damageType === 'missingProperties') {
        if (!missingProperties.length) return
        for (let i = 0; i < mod.count; i++) {
          const d = missingProperties.pop()
          if (!recoveredData[mod.damageType]) recoveredData[mod.damageType] = {}
          recoveredData[mod.damageType][d] = shipment[d]
        }
        // ---
      } else if (mod.damageType === 'damagedProperties') {
        if (!damagedProperties.length) return
        for (let i = 0; i < mod.count; i++) {
          const d = damagedProperties.pop()
          if (!recoveredData[mod.damageType]) recoveredData[mod.damageType] = {}
          recoveredData[mod.damageType][d] = shipment[d]
        }
        // ---
      } else { // damaged Keys
        if (!damagedKeys.length) return
        for (let i = 0; i < mod.count; i++) {
          const d = damagedKeys.pop()
          if (!recoveredData[mod.damageType]) recoveredData[mod.damageType] = {}
          recoveredData[mod.damageType][d] = shipment.damagedKeys[d]
        }
      }
    })
    lostShipment.recoveredData = recoveredData
    return lostShipment
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
