


export class Shipment{
  constructor(data){
    this.recipient = data.recipient
    this.trackingNumber = data.trackingNumber
    this.description = data.description
    this.shippingTier = data.shippingTier
    this.postageCost = data.postageCrypto
    this.postageCrypto = data.postageCrypto
    this.shippingDate = data.shippingDate
    this.dateFormat = data.dateFormat
    this.delivered = data.delivered
    this.postalStation = data.postalStation
    this.postalHistory = data.postalHistory

    this.insured = data.insured
    this.pirateCoverage = data.pirateCoverage
    this.insuredCost = data.insuredCost

    this.sector = data.sector
    this.hasQuadrantCode = data.hasQuadrantCode
    this.quadrantCode = data.quadrantCode

    this.galaxy = data.galaxy
    this.galaxyCode = data.galaxyCode

    this.planet = data.planet
    this.planetNumber = data.planetNumber
    this.planetCode = data.planetCode

    this.containsHazard = data.hazard
    this.hazard = data.hazard

    this.creditsWorth = data.creditsWorth
    this._id = data._id
  }
}
