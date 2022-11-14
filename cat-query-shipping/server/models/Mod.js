import { Schema } from 'mongoose'
const modTypes = []
const modRarities = []

export const ModSchema = new Schema({
  type: { type: String, required: true, enum: modTypes },
  description: { type: String, required: true },
  img: { type: String, required: true },
  level: { type: Number, required: true },
  rarity: { type: String, required: true, enum: modRarities, default: 'uncommon' },
  cost: { type: Number, required: true }
})
