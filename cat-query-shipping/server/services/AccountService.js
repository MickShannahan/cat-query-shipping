import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'

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
    picture: body.picture
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
    const account = await dbContext.Account.findById(userId)
    account.totalPagesPrinted += data.pages
    account.totalRequestsMade += data.requests
    account.currentPagesPrinted += data.pages
    account.currentRequestsMade += data.requests
    logger.log(data)
    account.averagePagesPrinted = data.averagePages ? Math.round((account.averagePagesPrinted + data.averagePages) / 2) : account.averagePagesPrinted
    account.averageRequestsMade = data.averageRequests ? Math.round((account.averageRequestsMade + data.averageRequests) / 2) : account.averageRequestsMade
    account.save()
    this.updateGrade(userId)
  }

  async updateGrade(userId) {
    const account = await dbContext.Account.findById(userId)
    switch (account.shipmentsFound.length) {
      case 5:
        account.employeeGrade = 'Kitten'
        break
      case 10:
        account.employeeGrade = 'Tabby'
        break
      default:
        // eslint-disable-next-line no-case-declarations
        let score = 100
        if (account.shipmentsFound.length > 99 && account.credits > 7000) {
          score = account.averagePagesPrinted + account.averageRequestsMade * 2
        } else if (account.shipments.length > 50 && account.credits > 3500) {
          score = account.averagePagesPrinted + account.averageRequestsMade * 4
        } else {
          score = account.averagePagesPrinted + account.averageRequestsMade * 6
        }
        if (score <= 6) {
          account.employeeGrade = 'S+'
        } else if (score <= 9) {
          account.employeeGrade = 'S'
        } else if (score <= 15) {
          account.employeeGrade = 'A'
        } else if (score <= 25) {
          account.employeeGrade = 'B'
        } else if (score <= 40) {
          account.employeeGrade = 'C'
        } else {
          account.employeeGrade = 'D'
        }

        break
    }
    logger.log('updated Grade', account.name, account.score, account.employeeGrade)
    account.save()
  }
}
export const accountService = new AccountService()
