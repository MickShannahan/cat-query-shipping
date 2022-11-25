

export class Mod {
  constructor({ id, itemId, name, cost, description, data, img, rarity, type, x, y, slots, action, burnt }) {
    this.id = id
    this.itemId = itemId
    this.name = name
    this.cost = cost
    this.description = description
    this.img = img
    this.rarity = rarity
    this.type = type
    this.burnt = burnt || data.burnt || data.count <= 0
    this.x = x || 0
    this.y = y || 0
    //unwrap data
    this.slots = slots || data.slots
    this.action = action || data.action
    this.durability = data.durability
    this.data = data
  }
}
