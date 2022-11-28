import axios from "axios"
import { AppState } from "../AppState.js"
import { Changelog } from "../models/ChangeLog.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

const github = axios.create({
  baseURL: 'https://api.github.com/repos/mickshannahan/cat-query-shipping/',
  timeout: 5000
})



class GameService {

  async getShop() {
    try {
      const res = await api.get('api/game/shop')
      logger.log('[Shop]', res.data)
      AppState.shop = res.data
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async buyItem() {
    try {

      let item = AppState.activeItem
      if (item.id == 'random') {
        return this.buyRandom()
      }
      const res = await api.get('api/game/shop/buy/' + item.id)
      logger.log('[BUY ITEM]', res.data)
      AppState.account.inventory.push(res.data)
    } catch (error) {
      Pop.error(error)
    }
  }

  async buyRandom() {
    try {
      const res = await api.get('api/game/shop/buy/random')
      logger.log('[BUY ITEM]', res.data)
      AppState.account.inventory.push(res.data)
      AppState.hiddenItem = res.data
      return res.data
    } catch (error) {
      Pop.error(error)
    }
  }

  async scrapItem() {
    try {
      const item = AppState.activeItem
      const res = await api.delete('api/items/scrap/' + item.id)
      logger.log('[SCRAP ITEM]', res.data)
      AppState.activeItem = {}
      let itemI = AppState.account.inventory.findIndex(it => it.id == item.id)
      AppState.account.inventory.splice(itemI, 1)
      Pop.toast(res.data, 'success')
    } catch (error) {
      Pop.error(error)
    }
  }

  async getChangelog() {
    try {
      const res = await github.get('pulls?state=closed')
      logger.log('[Git History]', res.data)
      AppState.changelogs = res.data.map(c => new Changelog(c))
    } catch (error) {
      Pop.error(error.message)
    }
  }

  setItem(item) {
    AppState.activeItem = {}
    setTimeout(() => AppState.activeItem = item, 100)
  }
}

export const gameService = new GameService()
