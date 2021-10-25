import Cat from 'catid'
import mongoose from 'mongoose'
import { hashIt } from '../utils/Cryptor'
import { bool, code, crypto, damageKeys, damageProperties, dateFormat, description, insuredAmount, missingProperties, planet, planetCode, planetNumber, postageCost, postalHistory, postalStation, quadrantCode, shippingTier, spaceDate, tracking } from '../utils/Generators'
import { logger } from '../utils/Logger'
const Schema = mongoose.Schema

const codeRx = /[A-Z][1-9][1-9]/
const trackingRx = /[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[a-z]/
const dateRx = /[0-9]{2}/
const cryptos = ['KITCOIN', 'SCRATCH', 'M0nSER4T', 'SAUCER', 'PETCO', 'MOONCHSE', 'CNIP', 'DOMINION']

const HazardSchema = new Schema(
  {
    notes: { type: String },
    grade: { type: String, enum: ['A', 'B', 'E', 'X', 'LAZER', 'CONVICT'] },
    isWeapon: { type: Boolean },
    isValidated: { type: Boolean },
    expirationDate: { type: String, validate: function(val) { return dateRx.test(val) }, default: spaceDate() }
  }
)

export const ShipmentSchema = new Schema(
  {
    recipient: { type: String, required: true },
    trackingNumber: { type: String, validate: function(val) { return trackingRx.test(val) } },
    description: { type: String },
    shippingTier: { type: String, enum: ['1LTYR', '2LTYR', 'METEOR-FREIGHT', 'GALAXY-EXPRESS', 'TELEPORT+', 'INTERPLANETARY/DOMESTIC', 'STANDARD', 'STANDARD+', 'WARP-FREIGHT'] },
    postageCost: { type: Number },
    postageCrypto: { type: String, enum: cryptos },
    shippingDate: { type: String, validate: function(val) { return dateRx.test(val) } },
    dateFormat: { type: String, enum: ['Minkow', 'Sol', 'Tera', 'Union'] },
    delivered: { type: Boolean },
    postalStation: { type: String },
    postalHistory: [{ type: String }],

    insured: { type: Boolean },
    pirateCoverage: { type: Boolean },
    insuredCost: { type: Number },
    insuredCrypto: { type: String, enum: cryptos },

    sector: { type: String, validate: function(val) { return codeRx.test(val) } },

    quadrant: { type: Number },
    hasQuadrantCode: { type: Boolean },
    quadrantCode: { type: String },

    galaxy: { type: String },
    galaxyCode: { type: Number },

    planet: { type: String },
    planetNumber: { type: Number },
    planetCode: { type: String, minlength: 4, maxlength: 4 },

    containsHazard: { type: Boolean, required: true },
    hazard: { type: HazardSchema },

    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile' },

    missingProperties: [{ type: String }],
    damagedProperties: { type: Object },
    damagedKeys: { type: Object },
    difficultyRating: { type: Number, default: 1, min: 1, max: 10 },
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
    this.postageCost = postageCost(this.shippingTier)
    this.postageCrypto = crypto()
    this.shippingDate = spaceDate()
    this.dateFormat = dateFormat()
    this.delivered = bool()
    this.postalStation = postalStation()
    this.postalHistory = [postalHistory()]

    this.insured = bool()
    this.pirateCoverage = bool()
    this.insuredCost = insuredAmount(this.insured, this.pirateCoverage, this.postageCost)

    this.sector = code()
    this.hasQuadrantCode = bool()
    this.quadrantCode = quadrantCode(this.hasQuadrantCode)

    this.galaxy = 'milky way'
    this.galaxyCode = 12

    this.planet = planet()
    this.planetNumber = planetNumber(this.planet)
    this.planetCode = planetCode(this.planet)

    this.containsHazard = bool()
    this.hazard = null

    this.missingProperties = missingProperties(this, 0.2)
    this.damagedProperties = damageProperties(this, 0.3)
    this.damagedKeys = damageKeys(this, 0.1)
    this.creditsWorth = 0
    this.difficultyRating = 1
  }
}
