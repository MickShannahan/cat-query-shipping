import { Schema } from 'mongoose'
import { ItemSchema } from './Item.js'

const InstalledMod = new Schema({
  ...ItemSchema.obj,
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 }
})

export const employeeGrades = ['S++', 'S+', 'S', 'A+', 'A', 'B', 'C', 'D', 'Bob Cat', 'Tabby', 'Kitten', 'Trainee', '']

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    credits: { type: Number, default: 0 },
    totalCredits: { type: Number, default: 0 },
    components: { type: Number, default: 0 },
    lostShipmentId: { type: Schema.Types.ObjectId, ref: 'Shipment', default: '6375d64e2373636d157fdd5a' },
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

    leaderScore: { type: Number, required: true, default: 0 },
    employeeGrade: { type: String, enum: employeeGrades, default: 'Trainee' },
    topGrade: { type: String, enum: employeeGrades },
    gradingPeriod: { type: Number, required: true, default: 0, max: 10, min: 0 },

    minDifficulty: { type: Number, default: 1 },
    maxDifficulty: { type: Number, default: 5 },

    scolded: [{ type: String, default: [] }],
    praised: [{ type: String, default: [] }],

    needsTour: { type: Boolean, default: true },
    unlocks: [{ type: String }],
    // STUB If you wish to add additional properties do so here
    inventory: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    installedMods: [{ type: InstalledMod }]
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
