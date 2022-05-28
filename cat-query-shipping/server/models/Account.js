import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    credits: { type: Number, default: 0 },
    lostShipmentId: { type: Schema.Types.ObjectId, ref: 'Shipment', default: '62361f3836ac2a5a2a7eab53' },
    currentGuesses: [{ type: Schema.Types.ObjectId }],
    shipmentsFound: [{ type: Schema.Types.ObjectId }],
    shipmentsAbandoned: [{ type: Schema.Types.ObjectId }],

    totalPagesPrinted: { type: Number, default: 0 },
    currentPagesPrinted: { type: Number, default: 0 },
    averagePagesPrinted: { type: Number, default: 1 },
    totalRequestsMade: { type: Number, default: 0 },
    currentRequestsMade: { type: Number, default: 0 },
    averageRequestsMade: { type: Number, default: 1 },
    pagesHistory: [{ type: Number, default: [] }],
    requestsHistory: [{ type: Number, default: [] }],

    employeeGrade: { type: String, enum: ['S+', 'S', 'A', 'B', 'C', 'D', 'Bob Cat', 'Tabby', 'Kitten', 'Trainee'], default: 'Trainee' },
    minDifficulty: { type: Number, default: 1 },
    maxDifficulty: { type: Number, default: 5 },

    scolded: [{ type: String, default: [] }],
    praised: [{ type: String, default: [] }],

    needsTour: { type: Boolean, default: true },
    unlocks: [{ type: String }]
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('lostShipment', {
  localField: 'lostShipmentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Shipment'
})

export const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String }
    // NOTE if you want to make properties from the account public put them here
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
