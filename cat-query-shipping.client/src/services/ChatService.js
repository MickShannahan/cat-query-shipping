import { AppState } from "../AppState"
import { logger } from "../utils/Logger"



class ChatService{

  chat(youSay, lastBranch){
    AppState.bozNotification = ''
    let branches = AppState.chatTree
    if(youSay == '[Go Back]'){
      AppState.chatBranch = AppState.lastBranches.pop()
      logger.log('going back',AppState.chatBranch)
    } else {
      AppState.lastBranches.push(AppState.chatBranch)
      logger.log('previous branches',AppState.lastBranches)
      AppState.chatBranch = branches[youSay]
    }
  }

  addChat(branch, notification){
    AppState.chatTree = {...AppState.chatTree, ...branch}
    AppState.bozNotification = notification
  }
}


export const chatService = new ChatService()
