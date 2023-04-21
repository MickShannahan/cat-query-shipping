import { dbContext } from '../db/DbContext.js'
import { itemRarities } from '../models/Item.js'
import { BadRequest } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'
import { awardsService } from './AwardService.js'

class ItemsService {
  accountHasItem(accountToUpdate, itemId) {
    const hasItem = accountToUpdate.inventory.find(i => i.toString() === itemId)
    return hasItem
  }

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
    const rarity = _rollRarity()
    const itemCount = await dbContext.Items.count({ rarity })
    const rand = Math.floor(Math.random() * itemCount)
    const [item] = await dbContext.Items.find({ rarity }).skip(rand)
    account.inventory.push(item._id)
    account.markModified('inventory')
    await awardsService.checkAwards(account, null, item)
    await account.save()
    return item
  }

  async scrap(id, userInfo) {
    const account = await dbContext.Account.findById(userInfo.id).populate('inventory')
    const itemI = account.inventory.findIndex(it => it.id.toString() === id)
    if (itemI < 0) throw new BadRequest('cant find item at ' + id)
    const item = account.inventory[itemI]
    if (item.data && item.data.scrapValue) {
      account.components += item.data.scrapValue
    } else {
      account.credits += Math.round(item.cost / 4)
    }
    account.inventory.splice(itemI, 1)
    account.save()
    return `Scraped ${item.name}.`
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
      action: mod.action || mod.data.action,
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
    return await this.saveMods(mods, account)
  }

  async saveMods(mods, account, save = true) {
    account.installedMods = mods
    account.markModified('installedMods')
    if (save) await account.save()
    return mods
  }

  async removeMod(id, userId) {
    const account = await dbContext.Account.findById(userId)
    const index = await account.installedMods.findIndex(m => m.id.toString() === id)
    account.installedMods.splice(index, 1)
    await account.save()
    return 'removed a mod'
  }

  async equipCollectable(rawId, userId) {
    const account = await dbContext.Account.findById(userId)
    if (!this.accountHasItem(account, rawId)) throw new BadRequest("You don't own that item")
    const item = await dbContext.Items.findById(rawId)
    if (item.type !== 'collectable') throw new BadRequest('That is not a collectable')
    const trinket = {
      itemId: item.id,
      name: item.name,
      img: item.img,
      position: account.installedCollectables.length * 50 || 0
    }
    account.installedCollectables.push(trinket)
    await account.save()
    return account.installedCollectables[account.installedCollectables.length - 1]
  }

  async saveCollectables(trinkets, userId, save = true) {
    const account = await dbContext.Account.findById(userId)
    const allThere = trinkets.every(t => account.inventory.find(i => t.itemId === i.toString()))
    if (!allThere) throw new BadRequest('Some items are missing from your inventory')
    account.installedCollectables = trinkets
    account.markModified('installedCollectables')
    if (save) await account.save()
    return trinkets
  }

  async removeCollectable(id, userId) {
    const account = await dbContext.Account.findById(userId)
    const index = await account.installedCollectables.findIndex(c => c.id.toString() === id)
    account.installedCollectables.splice(index, 1)
    await account.save()
    return 'removed a collectable'
  }
}

export const itemsService = new ItemsService()

function _rollRarity() {
  const rarities = itemRarities
  const totalChance = rarities.reduce((sum, rarity) => sum + rarity.chance, 0)
  let roll = Math.random() * totalChance

  for (let i = 0; i < rarities.length; i++) {
    roll -= rarities[i].chance
    if (roll < 0) {
      logger.log('[roll]', rarities[i].name)
      return rarities[i].name
    }
  }
}
