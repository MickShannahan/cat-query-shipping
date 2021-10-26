import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'
import { shipmentService } from './ShipmentService'
class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      AppState.currentGuesses = res.data.currentGuesses
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
        AppState.account.credits += AppState.lostShipment.creditsWorth
      shipmentService.getLostShipment()
      } else {
        Pop.toast("that is not the right shipment",'error','top',5000)
      }
    } catch (error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
