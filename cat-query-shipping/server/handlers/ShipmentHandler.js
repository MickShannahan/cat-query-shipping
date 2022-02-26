import { SocketHandler } from '../utils/SocketHandler'
import { logger } from '../utils/Logger'

export class ShipmentHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket)
    this
      .on('SOCKET_TEST', this.testEvent)
      .on('join:room', this.joinRoom)
  }

  async joinRoom(payload) {
    logger.log('user joining room', payload)
    this.socket.join(payload.roomName)
    this.socket.emit('joined:room', payload)
  }

  async testEvent(payload) {
    this.socket.emit('IS_TESTED', payload)
  }
}
