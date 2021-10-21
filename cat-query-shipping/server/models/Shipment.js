import Cat from 'catid'
import mongoose from 'mongoose'
import { bool, code, crypto, description, insuredAmount, planet, planetCode, planetNumber, postageCost, postalHistory, postalStation, shippingTier, spaceDate, tracking } from '../utils/Generators'
const Schema = mongoose.Schema

const codeRx = /[A-Z][A-Z][0-9][0-9][A-Z]/
const trackingRx = /[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[a-z]/
const dateRx = /(Sol|Minkow|Tera|Union):[0-9]{4}:[0-9]{2}/
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
    shippingTier: { type: String, enum: ['1LTYR', '2LTYR', 'METEOR-FREIGHT', 'GALAXY-EXPRESS', 'TELEPORT+', 'INTERPLANETARY/DOMESTIC', 'STANDARD'] },
    postageCost: { type: Number },
    postageCrypto: { type: String, enum: cryptos },
    shippingDate: { type: String, validate: function(val) { return dateRx.test(val) } },
    deliveryDate: { type: String, validate: function(val) { return dateRx.test(val) } },
    delivered: { type: Boolean },
    postalStation: { type: String },
    postalHistory: [{ type: String }],

    insured: { type: Boolean },
    pirateCoverage: { type: Boolean },
    insuredAmmount: { type: Number },
    insuredCrypto: { type: String, enum: cryptos },

    sector: { type: String, validate: function(val) { return codeRx.test(val) } },

    quadrant: { type: Number },
    hasQuadrantCode: { type: Boolean },
    quadrantCode: { type: String, validate: function(val) { return codeRx.test(val) } },

    galaxy: { type: String },
    galaxyCode: { type: Number },

    planet: { type: String },
    planetNumber: { type: Number },
    planetCode: { type: String, minlength: 4, maxlength: 4 },

    containsHazard: { type: Boolean, required: true },
    hazard: { type: HazardSchema },

    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile' },

    missingProperties: [{ type: String }]
  },
  {
    toObject: {
      transform: function(doc, ret, options) {
        ret.missingProperties.forEach(p => {
          delete ret[p]
        })
        delete ret.id
        delete ret._id
        if (ret.missingProperties) delete ret.missingProperties
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
    this.deliveryDate = spaceDate()
    this.delivered = bool()
    this.postalStation = postalStation()
    this.postalHistory = [postalHistory()]

    this.insured = bool()
    this.pirateCoverage = bool()
    this.insuredAmmount = insuredAmount(this.insured, this.pirateCoverage, this.postageCost)

    this.sector = code()
    this.hasQuadrantCode = bool()
    this.quadrantCode = code()

    this.galaxy = 'milky way'
    this.galaxyCode = 12

    this.planet = planet()
    this.planetNumber = planetNumber(this.planet)
    this.planetCode = planetCode(this.planet)

    this.containsHazard = bool()
    this.hazard = null
    this.missingProperties = []
  }

  lostProps(object) {
    const keys = Object.keys(object)
    const missingKeys = keys.map(key => {
      if (Math.random() > 0.5) {
        return key
      }
      return null
    }).filter(n => n)
    this.missingProperties = missingKeys
  }
}
