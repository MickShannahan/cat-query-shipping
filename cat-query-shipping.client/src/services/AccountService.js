import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'
import { shipmentService } from './ShipmentService'
import { lcStorage } from "./Storage"
class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      AppState.currentGuesses = res.data.currentGuesses
      lcStorage.saveUser(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async checkAnswer(answerId){
    try {
      logger.log('checking', answerId)
      let res = await api.get('account/lostshipment/answer/' + answerId)
      logger.log(res.data)
      AppState.currentGuesses = res.data.currentGuesses
      if(res.data.result){
        Pop.toast("You found the shipment",'success','top',5000)
        this.countUpCredits(AppState.lostShipment.creditsWorth)
        await shipmentService.getLostShipment()
      } else {
        Pop.toast("that is not the right shipment",'error','top',5000)
      }
    } catch (error) {
      logger.error(error)
    }
  }
   countUpCredits(creds) {
    const account = AppState.account
    let interval = null
   interval = setInterval(()=> {
      if(creds > 0){
        account.credits++
        creds--
      } else {
        clearInterval(interval)
      }
    }, 30)
  }

  async editAccount(){
    let res = await api.put('account', AppState.account)
    logger.log(res)
  }
}

export const accountService = new AccountService()


