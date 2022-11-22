import { Schema } from 'mongoose'

export const ShopSchema = new Schema({
  itemsForSale: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  title: { type: String },
  sale: { type: Number }

}, { timestamps: true, toJSON: { virtuals: true } })
