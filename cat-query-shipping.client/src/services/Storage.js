import { AppState } from "../AppState"
import { User } from "../models/User"
import { logger } from "../utils/Logger"

class LocalStorage {

  saveUser(data){
    logger.log('saving', data.name)
    let users = JSON.parse(localStorage.getItem('cupsUsers'))
    if(!users) users = []
    if(users){
     let index = users.findIndex(u => u.id == data.id)
     users.splice(index, 1, new User(data))
    } else {
      users = [...users, new User(data)]
    }
    localStorage.setItem('cupsUsers', JSON.stringify(users))
  }

  loadUsers(){
    let data = JSON.parse(localStorage.getItem('cupsUsers'))
    if(data){
      logger.log('loaded users', data)
      AppState.users = data.map(u => new User(u))
    }
  }

}

export const lcStorage = new LocalStorage()
