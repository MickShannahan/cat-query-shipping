import Axios from 'axios';
import { baseURL, dev } from '../env';
export const api = Axios.create({
  baseURL,
  timeout: dev ? 30000 : 15000

})

export const unblob = Axios.create({
  baseURL: dev ? 'http://localhost:7071' : 'https://blobber.azurewebsites.net',
  timeout: 90000,
})


// {paramsSerializer: function(params) {
//   var result = '';
//  logger.log('axios serial', params)
//   return result;
// }
