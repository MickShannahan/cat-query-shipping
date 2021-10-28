import { AppState } from "../AppState"
import { logger } from "../utils/Logger"



class ChatService{

  chat(youSay, lastBranch){
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


}


export const chatService = new ChatService()
