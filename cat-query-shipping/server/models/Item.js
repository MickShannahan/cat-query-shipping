import { Schema } from 'mongoose'
const itemTypes = ['junk', 'mod', 'collectable', 'resource', 'data']
const itemRarities = ['common', 'uncommon', 'rare', 'ultra-rare', 'secret-rare']

export const ItemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: itemTypes },
  description: { type: String, required: true },
  img: { type: String, required: true },
  background: { type: String },
  rarity: { type: String, required: true, enum: itemRarities, default: 'common' },
  cost: { type: Number },
  craftCost: { type: Number },
  lastSold: { type: Date, default: new Date() },

  action: { type: String },
  data: { type: Object }
}, { toJSON: { virtuals: true } })

// NOTE data consists of things like level, durability, payouts or other data referenced with the action
