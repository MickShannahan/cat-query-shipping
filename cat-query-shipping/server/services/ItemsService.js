import { Mongoose, Schema } from 'mongoose'
import { dbContext } from '../db/DbContext.js'
import { InstalledMod } from '../models/Account.js'
import { BadRequest } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'

class ItemsService {
  async find(query = {}) {
    return await dbContext.Items.find(query)
  }

  async buyItem(itemId, userId) {
    const item = await dbContext.Items.findById(itemId)
    const shop = await dbContext.Shops.findOne()
    const forSale = shop.itemsForSale.map(i => i.toString())
    if (!forSale.includes(item.id.toString())) throw new BadRequest('that item is not for sale')

    const account = await dbContext.Account.findById(userId)
    if (account.credits < item.cost) throw new BadRequest('not enough credits')

    account.credits -= item.cost
    account.inventory.push(item.id)
    await account.save()
    return item
  }

  craft(itemId, userInfo) {
    throw new Error('Method not implemented.')
  }

  async roll(userId) {
    const itemCost = process.env.NODE_ENV === 'dev' ? 1 : 450
    const account = await dbContext.Account.findById(userId)
    if (account.credits < itemCost) throw new BadRequest('not enough credits')

    account.credits -= itemCost
    const rarity = _rollRarity(1000)
    const itemCount = await dbContext.Items.count({ rarity })
    const rand = Math.floor(Math.random() * itemCount)
    const items = await dbContext.Items.find({ rarity }).skip(rand)
    account.inventory.push(items[0]._id)
    account.save()
    return items[0]
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

  // Mods --------------------------------
  async equipMod(rawItem, userId) {
    const account = await dbContext.Account.findById(userId)
    const mod = await dbContext.Items.findOne(rawItem)
    const newMod = {
      name: mod.name,
      description: mod.description,
      img: mod.img,
      rarity: mod.rarity,
      type: mod.type,
      cost: mod.cost,
      itemId: rawItem._id,
      slots: mod.data.slots,
      action: mod.data.action,
      x: 0,
      y: 0,
      data: mod.data
    }

    account.installedMods.unshift(newMod)
    await account.save()
    return account.installedMods[0]
  }

  async updateMods(mods, userId) {
    const account = await dbContext.Account.findById(userId)
    account.installedMods = mods
    await account.save()
    return mods
  }

  async removeMod(id, userId) {

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
