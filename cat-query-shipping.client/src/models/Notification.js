import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"


export class Notification {
  constructor({ title, body, img, timer }) {
    this.id = 'n' + Math.random() * 1000000
    this.title = title
    this.body = body
    this.img = img
    this.timer = timer || 5000
    setTimeout(this.destroySelf, this.timer)
  }

  destroySelf() {
    const me = AppState.notifications.findIndex(n => n.id == this.id)
    if (me > -1) {
      logger.log('trigger self destruct')
      AppState.notifications.splice(me, 1)
    }
  }
}
