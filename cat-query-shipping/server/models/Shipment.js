import Cat from 'catid'
import mongoose from 'mongoose'
import { hashIt } from '../utils/Cryptor'
import { bool, code, codeReg, crypto, cryptos, damageShipment, dateFormat, dateReg, dateTypes, description, planet, planetCode, planetNumber, postalHistory, postalStation, quadrantCode, shippingCost, shippingTier, shippingTiers, spaceDate, totalCost, tracking, trackingReg } from '../utils/Generators'
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
    fragile: { type: Boolean },
    shippingTier: { type: String, enum: shippingTiers },
    shippingCost: { type: Number },
    currency: { type: String, enum: cryptos },
    insured: { type: Boolean },
    pirateCoverage: { type: Boolean },
    totalCost: { type: Number },

    shippingDate: { type: String },
    dateFormat: { type: String, enum: dateTypes },
    postalStation: { type: String },
    postalHistory: [{ type: String }],

    sector: { type: String, validate: function(val) { return codeReg.test(val) } },

    inQuadrant: { type: Boolean },
    quadrantCode: { type: String },

    galaxy: { type: String },

    planet: { type: String },
    planetNumber: { type: Number },
    planetCode: { type: String, minlength: 4, maxlength: 4 },

    containsHazard: { type: Boolean, required: true },
    hazard: { type: HazardSchema },

    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile' },

    missingProperties: { type: Array, default: [] },
    damagedProperties: { type: Object, default: {} },
    damagedKeys: { type: Object, default: {} },
    found: { type: Boolean, default: false },
    difficultyRating: { type: Number, default: 1, min: 1, max: 20 },
    creditsWorth: { type: Number, default: 0 }
  },
  {
    toObject: {
      transform: function(doc, ret, options) {
        try {
          logger.log(ret.recipient, ret)
          ret.id = hashIt(ret._id.toString())
          delete ret._id
          // missing Props
          if (ret.missingProperties) {
            logger.log('missing props', ret.missingProperties)
            ret.missingProperties.forEach(p => {
              delete ret[p]
            })
            delete ret.missingProperties
          }

          // Damaged Props
          if (ret.damagedProperties) {
            logger.log('damaged props', ret.damagedProperties)
            Object.keys(ret.damagedProperties).forEach(p => {
              if (ret[p]) {
                ret[p] = ret.damagedProperties[p]
              }
            })
            delete ret.damagedProperties
          }

          // Damaged Keys
          if (ret.damagedKeys) {
            logger.log('damaged keys', ret.damagedKeys)
            Object.keys(ret.damagedKeys).forEach(p => {
              if (ret[p]) {
                ret[ret.damagedKeys[p]] = ret[p]
                delete ret[p]
              }
            })
            delete ret.damagedKeys
          }
          delete ret.description
          delete ret.found
          // TODO until implemented
          delete ret.postalStation
          delete ret.postalHistory
          delete ret.hazard
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
)

export class RandomShipment {
  constructor(rating, data = {}) {
    this.recipient = data.recipient || Cat.getName()
    this.trackingNumber = data.trackingNumber || tracking()
    this.description = data.description || description()
    this.fragile = data.fragile || bool()
    this.shippingTier = data.shippingTier || shippingTier()
    this.shippingCost = shippingCost(this.shippingTier)
    this.currency = data.currency || crypto()
    this.insured = data.insured || bool()
    this.pirateCoverage = data.pirateCoverage || bool()
    this.totalCost = totalCost(this.shippingTier, this.insured, this.pirateCoverage, this.currency)

    this.dateFormat = data.dateFormat || dateFormat()
    this.shippingDate = data.shippingDate || spaceDate(this.dateFormat)
    this.postalStation = data.postalStation || postalStation()
    this.postalHistory = data.postalHistory || [postalHistory()]

    this.sector = data.code || code()
    this.inQuadrant = data.inQuadrant || bool()
    this.quadrantCode = data.quadrantCod || quadrantCode(this.inQuadrant)

    this.galaxy = 'milky way'

    this.planet = data.planet || planet()
    this.planetNumber = planetNumber(this.planet)
    this.planetCode = planetCode(this.planet)

    this.containsHazard = data.contains || bool()
    this.hazard = null

    this.difficultyRating = rating
    this.missingProperties = []
    this.damagedProperties = {}
    this.damagedKeys = {}
    damageShipment(this, rating)
    // this.missingProperties = missingProperties(this, 0.3)
    // this.damagedProperties = damageProperties(this, 0.2)
    // this.damagedKeys = damageKeys(this, 0.1)
    // this.difficultyRating = difficultyRating(this.missingProperties, this.damagedProperties, this.damagedKeys)
    this.creditsWorth = this.difficultyRating * 10
  }
}
