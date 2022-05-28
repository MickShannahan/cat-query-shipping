import { dbContext } from '../db/DbContext'
import { RandomShipment } from '../models/Shipment'
import { socketProvider } from '../SocketProvider'
import { Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { chatsService } from './ChatsService'
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
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
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
    needsTour: body.needsTour
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

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const accountToUpdate = await dbContext.Account.findById(user.id)
    if (accountToUpdate.scolded.includes('name-change')) {
      socketProvider.messageUser(user.id, 'boz:notification', { data: accountToUpdate, chat: { 'Edit Denied': { text: `Hey, sorry about that.  Under normal circumstances I wouldn't mind letting you change your employee record details but considering our little *issue* with that LAST employee.  I can't let you do that.  Remember ${accountToUpdate.name} it's for both our benefit at this point.` } } })
      throw new Forbidden('Boz says: "Can\'t let you edit your account now kid, gotta keep you undercover"')
    }
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }

  async setLostShipment(userId, shipmentId) {
    const account = await dbContext.Account.findById(userId)
    account.lostShipmentId = shipmentId
    account.currentGuesses = []
    await account.save()
  }

  async updateAccountStats(userId, data) {
    logger.log('updating user', userId)
    const account = await dbContext.Account.findById(userId)
    const oldAccount = account.toObject()
    account.unlocks = account.unlocks ? account.unlocks : []
    // TODO write unlocks better
    if (new Date().getTime() - new Date(account.createdAt).getTime() > 86400000 * 3) { account.unlocks.push('mongo-terminal') }
    // update page/search stats
    if (data.pages > 0) {
      account.totalPagesPrinted += data.pages
      account.currentPagesPrinted += data.pages
      account.pagesHistory = [account.currentPagesPrinted, ...account.pagesHistory.splice(0, 5)]
    }
    account.totalRequestsMade += data.requests
    account.currentRequestsMade += data.requests
    account.requestsHistory = [account.currentRequestsMade, ...account.requestsHistory.splice(0, 5)]
    // if doing bad loose a package
    if (account.currentPagesPrinted >= 50 && account.currentRequestsMade === 3) {
      for (let i = 0; i <= Math.random() * 10; i++) {
        const shipment = new RandomShipment(Math.ceil(Math.random() * 20))
        shipmentsService.create(shipment)
      }
    }
    logger.log('update account data', account)
    // eslint-disable-next-line eqeqeq
    account.averagePagesPrinted = Math.round(account.pagesHistory.reduce((v, a) => a + v) / account.pagesHistory.length)
    account.averageRequestsMade = Math.round(account.requestsHistory.reduce((v, a) => a + v) / account.requestsHistory.length)
    await chatsService.employeeFeedback(account, oldAccount)
    account.save()
  }

  async updateGrade(userId) {
    const account = await dbContext.Account.findById(userId)
    const oldGrade = account.employeeGrade
    switch (account.shipmentsFound.length) {
      case 5:
        account.employeeGrade = 'Kitten'
        break
      case 10:
        account.employeeGrade = 'Tabby'
        account.maxDifficulty = 10
        break
      case 20:
        account.employeeGrade = 'Bob Cat'
        account.maxDifficulty = 10
        break
      default:
        if (account.shipmentsFound.length >= 30) {
          // eslint-disable-next-line no-case-declarations
          let score = 100
          if (account.shipmentsFound.length > 99 && account.credits > 7000) {
            score = account.averagePagesPrinted + account.averageRequestsMade * 2
          } else if (account.shipmentsFound.length > 50 && account.credits > 3500) {
            score = account.averagePagesPrinted + account.averageRequestsMade * 4
          } else {
            score = account.averagePagesPrinted + account.averageRequestsMade * 6
          }
          if (score <= 6) {
            account.employeeGrade = 'S+'
            account.maxDifficulty = 20
            account.minDifficulty = 14
          } else if (score <= 9) {
            account.employeeGrade = 'S'
            account.maxDifficulty = 20
            account.minDifficulty = 12
          } else if (score <= 15) {
            account.employeeGrade = 'A'
            account.maxDifficulty = 19
            account.minDifficulty = 10
          } else if (score <= 25) {
            account.employeeGrade = 'B'
            account.maxDifficulty = 15
            account.minDifficulty = 5
          } else if (score <= 40) {
            account.employeeGrade = 'C'
            account.maxDifficulty = 13
            account.minDifficulty = 4
          } else {
            account.employeeGrade = 'D'
            account.maxDifficulty = 10
            account.minDifficulty = 1
          }
        }
        break
    }
    await this.unlocks(account)
    account.save()

    logger.log('need notification?', oldGrade, account.employeeGrade)
    if (oldGrade !== account.employeeGrade) {
      logger.log('updated Grade', account.name, account.employeeGrade)
    }
  }

  async unlocks(account) {
    // account grade unlocks
    switch (account.employeeGrade) {
      case 'Tabby':
        socketProvider.messageUser(account.userId, 'boz:notification', { data: account, chat: { 'Updated Record': { text: `Hey I just updated your employed record kid. Looks like your are now a ${account.employeeGrade} grade. With that I unlocked the Mongo Terminal for you too, so you can start using that to refine your searches.` } } })
        account.unlocks.push('mongo-terminal')
        break
      case 'Bob Cat':
        // socketProvider.messageUser(account.userId, 'boz:notification', { data: account, chat: { 'Updated Record': { text: `Hey I just updated your employed record kid. Looks like your are now a ${account.employeeGrade} grade. With that I unlocked the Mongo Terminal for you too, so you can start using that to refine your searches.` } } })
        account.unlocks.push('mongo-terminal')
        break
    }

    // account shipments found

    // account age
    if (new Date().getTime() - new Date(account.createdAt).getTime() > 86400000 * 3) { account.unlocks.push('mongo-terminal') }
  }
}
export const accountService = new AccountService()
