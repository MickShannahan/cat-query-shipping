import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ChatSchema } from '../models/Chat'
import { ItemSchema } from '../models/Item.js'
import { ShipmentSchema } from '../models/Shipment'
import { ShopSchema } from '../models/Shop.js'
import { AwardSchema } from '../models/Award.js'

class DbContext {
  Chats = mongoose.model('Chat', ChatSchema)
  Shipments = mongoose.model('Shipment', ShipmentSchema)

  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Items = mongoose.model('Item', ItemSchema)

  Shops = mongoose.model('Shop', ShopSchema)

  Awards = mongoose.model('Award', AwardSchema)
}

export const dbContext = new DbContext()
