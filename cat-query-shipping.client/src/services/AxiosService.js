import Axios from 'axios';
import { baseURL, dev } from '../env';
export const api = Axios.create({
  baseURL,
  timeout: dev? 30000 : 8000

})


// {paramsSerializer: function(params) {
//   var result = '';
//  logger.log('axios serial', params)
//   return result;
// }
