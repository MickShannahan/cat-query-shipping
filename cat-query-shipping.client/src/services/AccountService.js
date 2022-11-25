import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Mod } from '../models/Mod.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api, unblob } from './AxiosService'
import { modsService } from './ModsService.js'
import { shipmentService } from './ShipmentService'
import { lcStorage } from "./Storage"
class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
      AppState.currentGuesses = res.data.currentGuesses
      lcStorage.saveUser(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  confirms = ['give me another', 'next', 'next shipment', 'what\'s next', 'another shipment please', 'hit me']
  async checkAnswer(answerId) {
    try {
      logger.log('checking', answerId)
      let res = await api.get('account/lostshipment/answer/' + answerId)
      logger.log(res.data)
      AppState.currentGuesses = res.data.currentGuesses
      if (res.data.result) {
        Pop.confirm("Shipment Found", 'contents: \n' + res.data.shipment.description, 'success', this.confirms[Math.floor(Math.random() * this.confirms.length)], false)
        AppState.account.gradingPeriod++
        this.countUpCredits(AppState.lostShipment.creditsWorth)
        await shipmentService.getLostShipment()
      } else {
        Pop.toast("that is not the right shipment", 'error', 'top', 5000)
      }
    } catch (error) {
      logger.error(error)
    }
  }
  countUpCredits(creds) {
    const account = AppState.account
    let interval = null
    interval = setInterval(() => {
      if (creds > 0) {
        account.credits++
        creds--
      } else {
        clearInterval(interval)
      }
    }, 30)
  }

  async editAccount(body) {
    let res = await api.put('account', body)
    logger.log(res.data)
    AppState.account = res.data
  }

  async uploadPicture(file) {
    let data = new FormData()
    data.append('file', file, file.name)
    const res = await unblob.post('api/blobber?blur=false&container=catsups&fileName=' + file.name, data)
    logger.log('uploaded picture', res.data)
    return res.data.url
  }
}

export const accountService = new AccountService()


