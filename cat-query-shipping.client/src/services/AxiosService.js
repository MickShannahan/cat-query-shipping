import Axios from 'axios';
import { baseURL } from '../env';
export const api = Axios.create({
  baseURL,
  timeout: 8000

})


// {paramsSerializer: function(params) {
//   var result = '';
//  logger.log('axios serial', params)
//   return result;
// }
