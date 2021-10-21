import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ShipmentSchema } from '../models/Shipment'

class DbContext {
  Shipments = mongoose.model('Shipment', ShipmentSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
