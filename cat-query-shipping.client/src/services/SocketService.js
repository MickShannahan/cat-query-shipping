import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'
import { chatService } from "./ChatService"
import { shipmentService } from './ShipmentService.js'
import { Notification } from "../models/Notification.js"

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('shipment:found', this.shipmentFound)
      .on('shipment:correct', this.correctShipment)
      .on('joined:room', this.joinedRoom)
      .on('account:error', this.accountError)
      .on('boz:notification', this.bozNotification)
      .on('new:award', this.newAward)
      .on('earned:award', this.earnedAward)
  }

  // OUTS

  joinRoom(roomName = 'GENERAL') {
    this.emit('join:room', { roomName })
  }

  // INS
  onError(e) {
    Pop.toast(e.message, 'error')
  }

  joinedRoom(payload) {
    logger.log('[joined:room]', payload)
  }

  async correctShipment(payload) { // when a user correctly guesses
    AppState.account.gradingPeriod++
    const confirms = ['give me another', 'next', 'next shipment', 'what\'s next', 'another shipment please', 'hit me']
    let answer = await Pop.confirm("Shipment Found", 'contents: \n' + payload.description, 'success', confirms[Math.floor(Math.random() * confirms.length)], false)
  }

  shipmentFound(payload) {
    logger.log('[shipment:found]', payload)
    AppState.shipmentsRemaining--
    AppState.recentFoundUsers.push(payload)
  }

  bozNotification(payload) {
    logger.log('[boz:notification]', payload)
    chatService.addChat(payload.chat, Object.keys(payload.chat)[0])
  }

  newAward(payload) {
    logger.log('[new:award]', payload)
    AppState.notifications.unshift(new Notification({ title: 'Discovered Award', body: payload.name }))
  }

  earnedAward(payload) {
    logger.log('award 🏆', payload)
    AppState.notifications.unshift(new Notification({ img: payload.img, title: 'Unlocked Award', body: payload.name }))
  }
  accountError(payload) {
    logger.error('[Socket Error]', payload)
    Pop.error(payload)
  }
}

export const socketService = new SocketService()
