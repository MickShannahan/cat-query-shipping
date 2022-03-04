import { Schema } from 'mongoose'

export const ChatSchema = new Schema({
  character: { type: String, required: true, default: 'boz' },
  title: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  branches: [{ type: String }]
})
