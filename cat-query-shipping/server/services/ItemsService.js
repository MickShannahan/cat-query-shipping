import { dbContext } from '../db/DbContext.js'
import { logger } from '../utils/Logger.js'

class ItemsService {
  async find(query = {}) {
    return await dbContext.Items.find(query)
  }

  buy(itemId, userInfo) {
    throw new Error('Method not implemented.')
  }

  craft(itemId, userInfo) {
    throw new Error('Method not implemented.')
  }

  async roll(userInfo) {
    const account = await dbContext.Account.findById(userInfo.id)
    if (account.credits > 1000) {
      account.credits -= 1000
      const rarity = _rollRarity(1000)
      const itemCount = await dbContext.Items.count({ rarity })
      const rand = Math.floor(Math.random() * itemCount)
      const items = await dbContext.Items.find({ rarity }).skip(rand)
      account.inventory.push(items[0]._id)
      account.save()
      return items[0]
    }
    throw new Error('not enough credits')
  }

  scrap(id, userInfo) {
    throw new Error('Method not implemented.')
  }

  async create(body) {
    const item = await dbContext.Items.create(body)
    return item
  }

  update(body) {
    throw new Error('Method not implemented.')
  }

  async remove(id) {
    const item = await dbContext.Items.findById(id)
    await item.remove()
    return `deleted ${item.name}`
  }
}

export const itemsService = new ItemsService()

function _rollRarity(num) {
  const rarities = ['common', 'uncommon', 'rare', 'ultra-rare', 'secret-rare']
  let values = [47, 32, 16, 4.9, 0.1]
  values = values.map(v => Math.round((v / 100) * num))
  let out = []
  values.forEach((v, r) => {
    const arr = Array(v).fill(rarities[r])
    out = [...out, ...arr]
  })
  const roll = out[Math.floor(Math.random() * out.length)]
  logger.log('[roll]', roll)
  return roll
}
