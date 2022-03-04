


export class Shipment{
  constructor(data){
    this.recipient = data.recipient
    this.trackingNumber = data.trackingNumber
    this.description = data.description
    this.fragile = data.fragile
    this.shippingTier = data.shippingTier
    this.shippingCost = data.shippingCost
    this.totalCost = data.totalCost
    this.currency = data.currency
    this.shippingDate = data.shippingDate
    this.dateFormat = data.dateFormat
    this.postalStation = data.postalStation
    this.postalHistory = data.postalHistory

    this.insured = data.insured
    this.pirateCoverage = data.pirateCoverage
    this.insuredCost = data.insuredCost

    this.sector = data.sector
    this.inQuadrant = data.inQuadrant
    this.quadrantCode = data.quadrantCode

    this.galaxy = data.galaxy

    this.planet = data.planet
    this.planetNumber = data.planetNumber
    this.planetCode = data.planetCode

    this.containsHazard = data.hazard
    this.hazard = data.hazard

    this.creditsWorth = data.creditsWorth
    this._id = data._id
  }

  static regex(){
    return /recipient|trackingNumber|shippingTier|currency|shippingDate|dateFormat|delivered|postalStation|shippingCost|totalCost|postalHistory|pirateCoverage|insured|sector|inQuadrant|quadrantCode|galaxy|planetCode|planetNumber|planet|containsHazard|hazard|creditsWorth|fragile/g
  }
}
