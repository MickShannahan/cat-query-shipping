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
export const shipmentService = new ShipmentService()


// TODO move to utils

function stringToObject(str){
let out = {}
let flat = /query|=|const|let|var|\n| /g
str = str.replace(flat, '')
if(str.startsWith('{')) str = str.slice(1)
if(str.endsWith('}')) str = str.slice(0,str.length-1)

let dataArr = betterSplit(str)
// console.log('dataArr',dataArr)
dataArr.forEach(d=>{
  let index = d.indexOf(':')
  let key = d.slice(0, index)
  let value = dataTyper(d.slice(index + 1))
  out[key] = value
})
// console.log('out',out)
return out
}



// DATA TYPER
function dataTyper(value){
  // console.log('determining type', value)
  let out = null
const unquote = /'|"/g
if(Math.abs(1 + value) > 1){
    out = parseInt(value)
  } else if( value == 'true' ){
    out = true
  } else if(value == 'false'){
    out = false
  } else if(value.startsWith('{')){
    out = stringToObject(value)
  } else if(value.startsWith('[')){

    out = betterSplit(value.slice(1, value.length-1)).map(v => dataTyper(v))

  } else if (value == null){
    out = null
  } else {
    out = value.replace(unquote, '')
  }
  return out
}


// Tracking split
function betterSplit(str){
  str += ','
let dataArr = []
let strArr = str.split('')
let lastComma = 0
let inner = []
strArr.forEach((c,i) =>{
  if(c == ','&& inner.length ==0){
    dataArr.push(strArr.slice(lastComma, i).join(''))
    lastComma = i +1
  } else if(c == '['){
    inner.push('[')
  } else if (c == ']'){
    inner.pop()
  } else if (c == '{'){
    inner.push('{')
  } else if (c == '}'){
    inner.pop()
  }
})
return dataArr
}








