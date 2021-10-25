import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'



class ShipmentService{
  async getLostShipment(){
    let res = await api.get('api/shipments/lost')
    logger.log('lost shipment ', res.data)
    AppState.lostShipment = res.data
  }

  async searchShipmentDatabase(queryString){
    AppState.searchResults = []
    logger.log('searching',queryString)
    let res = await api.get('api/shipments'+ queryString)
    logger.log('search ',res.data)
    AppState.searchResults = res.data
  }

  async searchWithQueryObject(qString){
    const qObject = stringToObject(qString)
    AppState.searchResults = []
    logger.log('searching', qObject)
    let res = await api.post('api/shipments/query', qObject)
    logger.log(res.data)
    AppState.searchResults = res.data
  }



}

function stringToObject(str){
  let object = {}
  let flat = /query|=|const|let|var|\n| /g
  str = str.replace(flat, '')
 let rb = /{/g
 let lb  = /}/g
 let comma = /,/g
 let colon = /:/g

  str = str.replace(rb, '{ "')
  str = str.replace(lb, '" }')
  str = str.replace(comma, '", "')
  str = str.replace(colon, '" : "')
  // str = str.split(',')
  // str.forEach(p => {
  //   const key = p.split(':')[0]
  //   const value = p.split(':')[1]
  // })
  // let json = JSON.stringify(object)
  logger.log(str)
  object = JSON.parse(str)
  logger.log(object)
  return object
}


export const shipmentService = new ShipmentService()
