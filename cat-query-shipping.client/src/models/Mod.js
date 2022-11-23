

export class Mod {
  constructor({ id, itemId, name, cost, description, data, img, rarity, type, x, y, slots, action }) {
    this.id = id
    this.itemId = itemId
    this.name = name
    this.cost = cost
    this.description = description
    this.img = img
    this.rarity = rarity
    this.type = type
    this.x = x || 0
    this.y = y || 0
    //unwrap data
    this.slots = data.slots || slots
    this.action = data.action || action
    this.durability = data.durability
    this.data = data
  }
}
