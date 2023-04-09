import { Schema } from 'mongoose'

export const AwardSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  subscriber: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, default: 'https://catsupssources.blob.core.windows.net/items/DefaultAward.png' },
  progress: { type: Number },
  limit: { type: Number },
  count: { type: Number, required: true, default: 0 },
  repeatable: { type: Boolean, default: false },
  secret: { type: Boolean, required: true, default: false },
  creditsAward: { type: Number },
  itemAward: { type: Schema.Types.ObjectId, ref: 'Item' },
  hint: { type: String }
}, { toJSON: { virtuals: true } })
