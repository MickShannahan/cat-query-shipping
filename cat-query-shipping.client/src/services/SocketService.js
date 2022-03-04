import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'
import { chatService } from "./ChatService"

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('shipment:found', this.shipmentFound)
      .on('joined:room', this.joinedRoom)
      .on('boz:notification', this.bozNotification)
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

  bozNotification(payload){
    logger.log('[boz:notification]',payload)
    chatService.addChat(payload.chat, Object.keys(payload.chat)[0])
  }
}

export const socketService = new SocketService()
