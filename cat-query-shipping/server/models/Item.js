import { Schema } from 'mongoose'
export const itemTypes = ['junk', 'mod', 'collectable', 'resource', 'data']
export const itemRarities = [
  { name: 'common', chance: 40 },
  { name: 'uncommon', chance: 32 },
  { name: 'rare', chance: 18 },
  { name: 'super-rare', chance: 7.9 },
  { name: 'ultra-rare', chance: 2.02 },
  { name: 'secret-rare', chance: 0.08 }
]

export const ItemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: itemTypes },
  description: { type: String, required: true },
  img: { type: String, required: true },
  background: { type: String },
  rarity: { type: String, required: true, enum: itemRarities.map(r => r.name), default: 'common' },
  cost: { type: Number },
  craftCost: { type: Number },
  lastSold: { type: Date, default: new Date() },

  action: { type: String },
  data: { type: Object }
}, { toJSON: { virtuals: true } })

// NOTE data consists of things like level, durability, payouts or other data referenced with the action
