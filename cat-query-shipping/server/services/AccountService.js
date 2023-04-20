import { dbContext } from '../db/DbContext'
import { notfs } from '../db/Notifications.js'
import { employeeGrades } from '../models/Account.js'
import { RandomShipment } from '../models/Shipment'
import { socketProvider } from '../SocketProvider'
import { Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { chatsService } from './ChatsService'
import { itemsService } from './ItemsService.js'
import { shipmentsService } from './ShipmentsService'
// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    const shipment = await dbContext.Shipments.findOne({ difficultyRating: 1 })
    account = await dbContext.Account.create({
      ...user,
      lostShipmentId: shipment._id,
      subs: [user.sub],
      unlocks: []
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture,
    needsTour: body.needsTour,
    favoriteCollectable: body.favoriteCollectable
  }
  if (process.env.NODE_ENV === 'dev' && body.lostShipmentId) {
    writable.lostShipmentId = body.lostShipmentId
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  async getPrivateAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    }).populate('inventory favoriteCollectable')
    if (!account) {
      account = await createAccountIfNeeded(account, user)
      await mergeSubsIfNeeded(account, user)
    }

    delete account._doc.lostShipmentId
    return account
  }

  async setLostShipment(userId, shipmentId) {
    const account = await dbContext.Account.findById(userId)
    account.lostShipmentId = shipmentId
    account.currentGuesses = []
    await account.save()
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const accountToUpdate = await dbContext.Account.findById(user.id)
    // dont update if they have been fired and rehired
    if (accountToUpdate.scolded.includes('name-change')) {
      socketProvider.messageUser(user.id, 'boz:notification', { data: accountToUpdate, chat: { 'Edit Denied': { text: `Hey, sorry about that.  Under normal circumstances I wouldn't mind letting you change your employee record details but considering our little *issue* with that LAST employee.  I can't let you do that.  Remember ${accountToUpdate.name} it's for both our benefit at this point.` } } })
      throw new Forbidden('Boz says: "Can\'t let you edit your account now kid, gotta keep you undercover"')
    }
    if (update.favoriteCollectable) {
      if (!await itemsService.accountHasItem(accountToUpdate, update.favoriteCollectable)) throw new Error('you do not posses that item.')
    }
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    await account.populate('favoriteCollectable inventory')
    return account
  }

  /**
   *  @param {String} userId
   *  @param {Object} data pages and requests made
   *  @param {boolean} save save once done?
   */
  async updateAccountStats(userId, data, save = false) {
    logger.log('updating user', userId)
    const account = await dbContext.Account.findById(userId)
    const oldAccount = account.toObject()
    // update page/search stats
    if (data.pages > 0) {
      account.totalPagesPrinted += data.pages
      account.currentPagesPrinted += data.pages
    }
    account.totalRequestsMade += data.requests
    account.currentRequestsMade += data.requests

    await chatsService.employeeFeedback(account, oldAccount)
    if (save) await account.save()
  }

  /**  @param {Object} account */
  async updateAccountHistory(account) {
    account.requestsHistory = [account.currentRequestsMade, ...account.requestsHistory.splice(0, 9)]
    account.pagesHistory = [account.currentPagesPrinted, ...account.pagesHistory.splice(0, 9)]
    // if doing bad loose a package
    if (account.currentPagesPrinted >= 50 && account.currentRequestsMade === 3) {
      for (let i = 0; i <= Math.random() * 10; i++) {
        const shipment = new RandomShipment(Math.ceil(Math.random() * 20))
        shipmentsService.create(shipment)
      }
    }
    // Update averages
    account.averagePagesPrinted = Math.ceil(account.pagesHistory.reduce((v, a) => a + v) / account.pagesHistory.length)
    account.averageRequestsMade = Math.ceil(account.requestsHistory.reduce((v, a) => a + v) / account.requestsHistory.length)
  }

  /**  @param {Object} account */
  async updateAccountScore(account) {
    const creds = account.totalCredits
    const ships = account.shipmentsFound.length
    account.leaderScore = creds + (ships * 50)
  }

  /**  @param {Object} account */
  async zeroAccountStats(account) {
    account.shipmentsFound.unshift(account.lostShipmentId)
    account.currentGuesses = []
    this.updateAccountStats(account.id, { pages: 0, requests: 0, averagePages: account.currentPagesPrinted, averageRequests: account.currentRequestsMade })
    account.currentPagesPrinted = 0
    account.currentRequestsMade = 0

    if (account.credits > account.totalCredits) {
      account.totalCredits = account.credits
    }
  }

  /**  @param {Object} account */
  async advanceGrade(account) {
    account.gradingPeriod++
    if (account.gradingPeriod === 10) {
      account.gradingPeriod = 0
      await this.updateGrade(account)
    }
  }

  /**  @param {Object} account */
  async updateGrade(account) {
    const oldGrade = account.employeeGrade
    const topGrade = account.topGrade
    switch (account.shipmentsFound.length) {
      case 5:
        this.rankUp(account, 'Kitten')
        break
      case 10:
        this.rankUp(account, 'Tabby')
        account.maxDifficulty = 10
        break
      case 20:
        this.rankUp(account, 'Bob Cat')
        account.maxDifficulty = 10
        break
      default:
        if (account.shipmentsFound.length >= 25) {
          // eslint-disable-next-line no-case-declarations
          let score = 100
          if (account.shipmentsFound.length > 99 && account.totalCredits > 7000) {
            score = account.averagePagesPrinted + account.averageRequestsMade * 2
          } else if (account.shipmentsFound.length > 50 && account.totalCredits > 3500) {
            score = account.averagePagesPrinted + account.averageRequestsMade * 4
          } else {
            score = account.averagePagesPrinted + account.averageRequestsMade * 6
          }

          if (score <= 6) {
            this.rankUp(account, 'S+')
            account.maxDifficulty = 20
            account.minDifficulty = 15
          } else if (score <= 9) {
            this.rankUp(account, 'S')
            account.maxDifficulty = 20
            account.minDifficulty = 12
          } else if (score <= 15) {
            this.rankUp(account, 'A')
            account.maxDifficulty = 18
            account.minDifficulty = 10
          } else if (score <= 25) {
            this.rankUp(account, 'B')
            account.maxDifficulty = 15
            account.minDifficulty = 5
          } else if (score <= 40) {
            this.rankUp(account, 'C')
            account.maxDifficulty = 13
            account.minDifficulty = 4
          } else {
            this.rankUp(account, 'D')
            account.maxDifficulty = 10
            account.minDifficulty = 1
          }
        }
        break
    }
    await this.unlocks(account)

    logger.log('need notification?', oldGrade, account.employeeGrade)
    if (oldGrade !== account.employeeGrade) {
      logger.log('updated Grade', account.name, account.employeeGrade)
    }
  }

  async rankUp(account, grade) {
    const oldRank = employeeGrades.findIndex(g => g === account.employeeGrade)
    const newRank = employeeGrades.findIndex(g => g === grade)
    if (newRank < oldRank) account.topGrade = grade
    account.employeeGrade = grade
  }

  async unlocks(account, save = false) {
    // account grade unlocks
    switch (account.employeeGrade) {
      case 'Tabby':
        if (_unlock(account, 'mongo-terminal')) { socketProvider.messageUser(account.userId, 'boz:notification', { data: account, chat: notfs.boz['grade-tabby'] }) }
        break
      case 'Bob Cat':
        break
      case 'S+':
        break
    }
    // account shipments found

    // account age
    if (new Date().getTime() - new Date(account.createdAt).getTime() > 86400000 * 3) {
      if (_unlock(account, 'mongo-terminal')) { socketProvider.messageUser(account.userId, 'boz:notification', { data: account, chat: notfs.boz['unlock-terminal'] }) }
    }

    if (save) await account.save()
  }
}
export const accountService = new AccountService()

function _unlock(account, unlock) {
  if (account.unlocks.includes(unlock)) {
    return false
  }
  account.unlocks.push(unlock)
  account.save()
  return true
}
