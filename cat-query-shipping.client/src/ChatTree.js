import { logger } from "./utils/Logger"

class ChatTree {
  prevBranches =[]
  currentBranch = {}
}

export const BozChat = new Proxy(new ChatTree(), {
  get(target, prop) {
    return target[prop]
  },
  set(target, prop, value) {
    if(target[prop] = 'currentBranch'){
      target.prevBranches.push(target.currentBranch)
      logger.log('last branches',target.prevBranches)
      target.lastBranch = target.currentBranch
      target.currentBranch = value
      logger.log('current branch', target.currentBranch)
      return true
    }
    return false
  }
})
