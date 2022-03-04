import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ChatSchema } from '../models/Chat'
import { ShipmentSchema } from '../models/Shipment'

class DbContext {
  Chats = mongoose.model('Chat', ChatSchema)
  Shipments = mongoose.model('Shipment', ShipmentSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
