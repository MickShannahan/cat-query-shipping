import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'



class ShipmentService{

  async searchShipmentDatabase(queryString){
    logger.log('searching',queryString)
    let res = await api.get('api/shipments'+ queryString)
    logger.log('search ',res.data)
    AppState.searchResults = res.data
  }

  async getLostShipment(){
    let res = await api.get('api/shipments/lost')
    logger.log('lost shipment ', res.data)
    AppState.lostShipment = res.data
  }
}

export const shipmentService = new ShipmentService()
