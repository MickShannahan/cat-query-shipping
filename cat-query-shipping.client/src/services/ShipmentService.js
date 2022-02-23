import { AppState } from '../AppState'
import { Shipment } from '../models/Shipment'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
import { api } from './AxiosService'

export const unsafeChars = [ ' ', '[', ']', '{', '}', '<', '>', '|', '\\', '^', '%']
export const reservedChars =['&', '$', '+', ',', '/', ':', ';', '=', '?', '@', '#']

class ShipmentService{
  async getAccountShipment(){
    let res = await api.get('account/shipment')
    logger.log(res.data)
    AppState.lostShipment = res.data
  }

  async getLostShipment(query = ''){
    AppState.loading.lostShipment = true
    AppState.lostShipment = {}
    let res = await api.get('api/shipments/lost' + query)
    logger.log('lost shipment ', res.data)
    setTimeout(()=>{
      AppState.lostShipment = res.data
      AppState.loading.lostShipment = false
      AppState.searchResults = {results: []}
      accountService.getAccount()
    },3000)
  }

  async searchShipmentDatabase(queryString){
    AppState.loading.thread = true
    AppState.searchResults = {results: []}
    AppState.account.currentRequestsMade++
    logger.log('searching',queryString)
    let res = await api.get('api/shipments'+ queryString)
    logger.log('search ', res.data)
    AppState.searchResults.hits = res.data.hits
    // Animate
    let interval = null
      interval = setInterval(()=>{
        let s = res.data.results.shift()
        if(s){
          AppState.searchResults.results.unshift(new Shipment(s))
          AppState.account.currentPagesPrinted++
        }else {
          clearInterval(interval)
          AppState.loading.thread = false
        }
      }, 200)
  }

  async searchWithQueryObject(qString){
    AppState.loading.thread = true
    const qObject = stringToObject(qString)
    AppState.searchResults = {results: []}
    let res = await api.post('api/shipments/query', qObject)
    logger.log('search object',res.data)
    AppState.searchResults.hits = res.data.hits
    // Animate
    let interval = null
      interval = setInterval(()=>{
        let s = res.data.results.shift()
        if(s){
          AppState.searchResults.results.unshift(new Shipment(s))
        } else {
          clearInterval(interval)
          AppState.loading.thread = false
        }
      }, 110)
  }



}
export const shipmentService = new ShipmentService()


// TODO move to utils

function stringToObject(str){
let out = {}
let flat = /(const query( |)=( |){)|query|const|let|var|\n|\s(?=(?:'[^']*'|[^'])*$)(?=(?:"[^"]*"|[^"])*$)(?=(?:\/[^/]*\/|[^/])*$)/g
str = str.replace(flat, '')
if(str.startsWith('{')) str = str.slice(1)
if(str.endsWith('}')) str = str.slice(0,str.length-1)

let dataArr = betterSplit(str)
console.log('dataArr',dataArr)
dataArr.forEach(d=>{
  let index = d.indexOf(':')
  let key = d.slice(0, index)
  let value = dataTyper(d.slice(index + 1))
  console.log(out)
  out[key] = value
})
console.log('out',out)
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
    out = value.trim().replace(unquote, '')
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






