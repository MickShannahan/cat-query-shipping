import Cat from 'catid'
import mongoose from 'mongoose'
import { hashIt } from '../utils/Cryptor'
import { bool, code, codeReg, crypto, cryptos, damageKeys, damageProperties, dateFormat, dateReg, dateTypes, description, difficultyRating, missingProperties, planet, planetCode, planetNumber, postalHistory, postalStation, quadrantCode, shippingCost, shippingTier, shippingTiers, spaceDate, totalCost, tracking, trackingReg } from '../utils/Generators'
import { logger } from '../utils/Logger'
const Schema = mongoose.Schema

const HazardSchema = new Schema(
  {
    notes: { type: String },
    grade: { type: String, enum: ['A', 'B', 'E', 'X', 'LAZER', 'CONVICT'] },
    isWeapon: { type: Boolean },
    isValidated: { type: Boolean },
    expirationDate: { type: String, validate: function(val) { return dateReg.test(val) }, default: spaceDate() }
  }
)

export const ShipmentSchema = new Schema(
  {
    recipient: { type: String, required: true },
    trackingNumber: { type: String, validate: function(val) { return trackingReg.test(val) } },
    description: { type: String },
    shippingTier: { type: String, enum: shippingTiers },
    shippingCost: { type: Number },
    currency: { type: String, enum: cryptos },
    insured: { type: Boolean },
    pirateCoverage: { type: Boolean },
    totalCost: { type: Number },

    shippingDate: { type: String, validate: function(val) { return dateReg.test(val) } },
    dateFormat: { type: String, enum: dateTypes },
    postalStation: { type: String },
    postalHistory: [{ type: String }],

    sector: { type: String, validate: function(val) { return codeReg.test(val) } },

    hasQuadrantCode: { type: Boolean },
    quadrantCode: { type: String },

    galaxy: { type: String },

    planet: { type: String },
    planetNumber: { type: Number },
    planetCode: { type: String, minlength: 4, maxlength: 4 },

    containsHazard: { type: Boolean, required: true },
    hazard: { type: HazardSchema },

    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile' },

    missingProperties: [{ type: String }],
    damagedProperties: { type: Object },
    damagedKeys: { type: Object },
    difficultyRating: { type: Number, default: 1, min: 1, max: 20 },
    creditsWorth: { type: Number, default: 0 }
  },
  {
    toObject: {
      transform: function(doc, ret, options) {
        ret.id = hashIt(ret._id.toString())
        delete ret._id
        // missing Props
        logger.log('missing props', ret.missingProperties)
        ret.missingProperties.forEach(p => {
          delete ret[p]
        })
        delete ret.missingProperties

        // Damaged Props
        logger.log('damaged props', ret.damagedProperties)
        Object.keys(ret.damagedProperties).forEach(p => {
          if (ret[p]) {
            ret[p] = ret.damagedProperties[p]
          }
        })
        delete ret.damagedProperties

        // Damaged Keys
        logger.log('damaged keys', ret.damagedKeys)
        Object.keys(ret.damagedKeys).forEach(p => {
          if (ret[p]) {
            ret[ret.damagedKeys[p]] = ret[p]
            delete ret[p]
          }
        })
        delete ret.damagedKeys
      }
    }
  }
)

export class RandomShipment {
  constructor() {
    this.recipient = Cat.getName()
    this.trackingNumber = tracking()
    this.description = description()
    this.shippingTier = shippingTier()
    this.shippingCost = shippingCost(this.shippingTier)
    this.currency = crypto()
    this.insured = bool()
    this.pirateCoverage = bool()
    this.totalCost = totalCost(this.shippingTier, this.insured, this.pirateCoverage, this.currency)

    this.shippingDate = spaceDate()
    this.dateFormat = dateFormat()
    this.postalStation = postalStation()
    this.postalHistory = [postalHistory()]

    this.sector = code()
    this.hasQuadrantCode = bool()
    this.quadrantCode = quadrantCode(this.hasQuadrantCode)

    this.galaxy = 'milky way'

    this.planet = planet()
    this.planetNumber = planetNumber(this.planet)
    this.planetCode = planetCode(this.planet)

    this.containsHazard = bool()
    this.hazard = null

    this.missingProperties = missingProperties(this, 0.3)
    this.damagedProperties = damageProperties(this, 0.2)
    this.damagedKeys = damageKeys(this, 0.1)
    this.difficultyRating = difficultyRating(this.missingProperties, this.damagedProperties, this.damagedKeys)
    this.creditsWorth = this.difficultyRating * 10
  }
}
