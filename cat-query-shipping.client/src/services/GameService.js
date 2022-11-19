import axios from "axios"
import { AppState } from "../AppState.js"
import { Changelog } from "../models/ChangeLog.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

const github = axios.create({
  baseURL: 'https://api.github.com/repos/mickshannahan/cat-query-shipping/',
  timeout: 5000
})



class GameService {

  async getChangelog() {
    try {
      const res = await github.get('pulls?state=closed')
      logger.log('[Git History]', res.data)
      AppState.changelogs = res.data.map(c => new Changelog(c))
    } catch (error) {
      Pop.error(error.message)
    }
  }
}

export const gameService = new GameService()
