import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('shipment:found', this.shipmentFound)
      .on('joined:room', this.joinedRoom)
  }

  // OUTS

  joinRoom(roomName = 'GENERAL'){
    this.emit('join:room', {roomName})
  }

  // INS
  onError(e) {
    Pop.toast(e.message, 'error')
  }

  joinedRoom(payload){
    logger.log('[joined:room]', payload)
  }

  shipmentFound(payload){
    logger.log('[shipment:found]',payload)
    AppState.shipmentsRemaining--
    AppState.recentFoundUsers.push(payload)

  }
}

export const socketService = new SocketService()
