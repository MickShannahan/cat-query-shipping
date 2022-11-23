import { Mod } from "./Mod.js"



export class Account {
  constructor({ email, name, picture, credits, totalCredits, components, currentGuesses, shipmentsFound, shipmentsAbandoned, totalPagesPrinted, currentPagesPrinted, totalRequestsMade, averageRequestsMade, pagesHistory, requestsHistory, leaderScore, employeeGrade, topGrade, gradingPeriod, minDifficulty, maxDifficulty, scolded, praised, needsTour, unlocks, inventory, installedMods }) {
    this.email = email
    this.name = name
    this.picture = picture
    this.credits = credits
    this.totalCredits = totalCredits
    this.components = components
    this.currentGuesses = currentGuesses
    this.shipmentsFound = shipmentsFound
    this.shipmentsAbandoned = shipmentsAbandoned
    this.totalPagesPrinted = totalPagesPrinted
    this.currentPagesPrinted = currentPagesPrinted
    this.totalRequestsMade = totalRequestsMade
    this.averageRequestsMade = averageRequestsMade
    this.pagesHistory = pagesHistory
    this.requestsHistory = requestsHistory
    this.leaderScore = leaderScore
    this.employeeGrade = employeeGrade
    this.topGrade = topGrade
    this.gradingPeriod = gradingPeriod
    this.minDifficulty = minDifficulty
    this.maxDifficulty = maxDifficulty
    this.scolded = scolded
    this.praised = praised
    this.needsTour = needsTour
    this.unlocks = unlocks
    this.inventory = inventory
    this.installedMods = installedMods.map(m => new Mod(m))
  }
}