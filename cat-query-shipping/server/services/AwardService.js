import { socketProvider } from '../SocketProvider.js'
import { dbContext } from '../db/DbContext.js'
import { logger } from '../utils/Logger.js'
import { profileService } from './ProfileService.js'
class AwardsService {
  async checkAwards(account, shipment = {}, data = {}) {
    try {
      const changes = await account.getChanges().$set
      logger.log('checking for awards', account.name, changes, shipment, data)
      for (const change in changes) {
        const checks = awardBases.filter(a => {
          if (a.subscriber === change) return true
          if (a.subscriber.includes(change)) return true
          if (a.subscriber.includes(data.type)) return true
          if (a.subscriber.includes('shipmentDifficulty') && shipment && shipment.difficultyRating >= parseInt(a.subscriber.split(':')[1])) return true
          return false
        })
        const proms = checks.map(award => award.check(account, shipment, data))
        // await Promise.all(proms)
        await account.save()
      }
    } catch (error) {
      socketProvider.messageUser(account.id, 'account:error', error.message)
    }
  }

  async getAwardsByAccountId(accountId) {
    const awards = await dbContext.Awards.find({ accountId }).populate('itemAward')
    return awards
  }
}

export const awardsService = new AwardsService()

const awardBases = [
  {
    name: '100 Shipments',
    subscriber: 'shipmentsFound',
    description: 'Recovered 100 lost shipments using the lost shipment terminal.',
    img: 'https://catsupssources.blob.core.windows.net/items/100shipments.png',
    repeatable: true,
    progress: 0,
    limit: 100,
    creditsAward: 3000,
    async check(account, shipment, data) {
      const award = await findOrCreateAward(account, this)
      const shipmentCount = account.shipmentsFound.length
      award.progress = shipmentCount
      if (award.progress % this.limit === 0) {
        earnAward(account, award, false)
        award.limit += 100
        award.creditsAward += 1500
      }
      await award.save()
    }
  },
  {
    name: 'Recovery Savant',
    subscriber: 'shipmentDifficulty:10',
    description: 'Recover a shipment with a difficulty rating of 10 or higher',
    repeatable: false,
    creditsAward: 500,
    hint: 'Recovery Professional',
    async check(account, shipment, data) {
      if (shipment.difficultyRating >= 10) {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        await earnAward(account, award)
      }
    }
  },
  {
    name: 'Recovery Professional',
    subscriber: 'shipmentDifficulty:15',
    description: 'Recover a shipment with a difficulty rating of 15 or higher',
    repeatable: false,
    creditsAward: 1000,
    hint: 'Recovery Expert',
    async check(account, shipment, data) {
      if (shipment.difficultyRating >= 15) {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        await earnAward(account, award)
      }
    }
  },
  {
    name: 'Recovery Expert',
    subscriber: 'shipmentDifficulty:18',
    description: 'Recover a shipment with a difficulty rating of 18 or higher',
    repeatable: false,
    creditsAward: 2000,
    hint: 'Recovery Master',
    async check(account, shipment, data) {
      if (shipment.difficultyRating >= 18) {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        await earnAward(account, award)
      }
    }
  },
  {
    name: 'Recovery Master',
    subscriber: 'shipmentDifficulty:20',
    description: 'Recover a shipment with a difficulty rating of 20 or higher',
    repeatable: false,
    creditsAward: 5000,
    async check(account, shipment, data) {
      if (shipment.difficultyRating >= 20) {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        await earnAward(account, award)
      }
    }
  },
  {
    name: 'Reduce Reuse Recover',
    subscriber: 'currentPagesPrinted',
    description: 'For 15 shipments in a row, print less than 11 pages per shipment.',
    progress: 0,
    limit: 15,
    repeatable: false,
    creditsAward: 2000,
    async check(account, shipment, data) {
      const award = await findOrCreateAward(account, this)
      if (account.currentPagesPrinted < 11) {
        award.progress++
      } else {
        award.progress = 0
      }
      if (award.progress === award.limit) {
        await earnAward(account, award)
      } else {
        await award.save()
      }
    }
  },
  {
    name: 'Super Employee Plus',
    subscriber: 'employeeGrade',
    description: 'Reach the S+ employee grade',
    img: 'https://catsupssources.blob.core.windows.net/items/S+Medal.png',
    repeatable: false,
    async check(account, shipment, data) {
      const award = await findOrCreateAward(account, this)
      if (award.count === 1) return null
      if (account.employeeGrade === 'S+') earnAward(account, award)
    }
  },
  {
    name: 'Glitch Hunter',
    subscriber: 'shipmentsFound',
    description: 'Recover 25 glitched shipments.',
    repeatable: false,
    progress: 0,
    limit: 25,
    creditsAward: 5250,
    async check(account, shipment, data) {
      if (shipment.glitch) {
        const award = await findOrCreateAward(account, this)
        if (award.count === 0) {
          award.progress++
          if (award.progress === award.limit) {
            earnAward(account, award, false)
          }
          await award.save()
        }
      }
    }
  },
  {
    name: 'Un-Scrambable-able',
    subscriber: 'shipmentsFound',
    description: 'Recover a Scrambled shipment with a difficulty rating of 13 or higher.',
    repeatable: false,
    creditsAward: 5000,
    async check(account, shipment, data) {
      if (shipment.glitch === 'scrambler') {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        if (shipment.difficultyRating >= 13) {
          await earnAward(account, award)
        }
      }
    }
  },
  {
    name: 'Oslo Collector',
    subscriber: 'inventory:collectable',
    description: 'Open 100 Oslo toys from abandoned shipments in the warehouse.',
    img: 'https://catsupssources.blob.core.windows.net/items/100Oslo.png',
    repeatable: false,
    progress: 0,
    limit: 100,
    itemAward: process.env.NODE_ENV === 'dev' ? '63732a564627ddf052bcebdd' : '63732a564627ddf052bcebdd',
    async check(account, shipment, data) {
      if (data.type !== 'collectable') return
      if (data.name === 'Oslo') {
        const award = await findOrCreateAward(account, this)
        award.progress++
        if (award.count === 0 && award.progress === award.limit) {
          earnAward(account, award, false)
        }
        await award.save()
      }
    }
  },
  {
    name: 'Speedy Recovery',
    subscriber: 'timer',
    description: 'Recover a shipment infected with the timer glitch',
    img: 'https://catsupssources.blob.core.windows.net/items/TimerMedalSilver.png',
    repeatable: false,
    creditsAward: 1200,
    async check(account, shipment, data) {
      if (shipment.glitch !== 'timer') return
      const award = await findOrCreateAward(account, this)
      if (award.count === 0) {
        earnAward(account, award)
      }
    }
  },
  {
    name: 'Lightning Recovery',
    subscriber: 'timer',
    description: 'Recover a shipment infected with the timer glitch and has a difficulty rating over 15',
    img: 'https://catsupssources.blob.core.windows.net/items/TimerMedalGold.png',
    repeatable: false,
    creditsAward: 3500,
    async check(account, shipment, data) {
      if (shipment.glitch !== 'timer' || shipment.difficultyRating < 15) return
      const award = await findOrCreateAward(account, this)
      if (award.count === 0) {
        earnAward(account, award)
      }
    }
  },
  {
    name: 'Employee of the Cycle',
    subscriber: 'leaderScore',
    description: 'Become employee of the cycle',
    repeatable: false,
    itemAward: process.env.NODE_ENV === 'dev' ? '6431f6b86f03c106635988a5' : '6431f6d9580d6bbffc93b0d7',
    async check(account, shipment, data) {
      const [leader] = await profileService.findProfiles()
      if (leader.id === account.id) {
        const award = await findOrCreateAward(account, this)
        if (award.count !== 0) return
        earnAward(account, award)
      }
    }

  }
]

async function findOrCreateAward(account, awardBase) {
  let award = await dbContext.Awards.findOne({ accountId: account.id, name: awardBase.name })
  if (!award) {
    award = await dbContext.Awards.create({ accountId: account.id, ...awardBase })
    socketProvider.messageUser(account.id, 'new:award', award)
  }
  if (award.description !== awardBase.description || award.limit !== awardBase.limit || award.creditsAward !== awardBase.creditsAward || award.itemAward !== awardBase.itemAward || award.img !== awardBase.img || award.repeatable !== awardBase.repeatable || award.hint !== awardBase.hint) {
    await awardBalance(award)
  }
  return award
}

async function earnAward(account, award, save = true) {
  if (award.count < 0 || award.repeatable) {
    award.count++
    if (award.creditsAward) {
      account.credits += award.creditsAward
    }
    if (award.itemAward) {
      account.inventory.push(award.itemAward)
    }
    logger.log(account.name, 'earned a reward 🏆', award)
    socketProvider.messageUser(account.id, 'earned:award', award)
    if (save) await award.save()
    if (award.hint) {
      const base = awardBases.find(a => a.name === award.hint)
      findOrCreateAward(account, base)
    }
  }
}

async function awardBalance(award) {
  const base = awardBases.find(a => a.name === award.name)
  award.limit = award.limit ? base.limit : undefined
  award.repeatable = award.repeatable ? base.repeatable : undefined
  award.creditsAward = award.creditsAward ? base.creditsAward : undefined
  award.itemAward = award.itemAward ? base.itemAward : undefined
  award.hint = award.hint ? base.hint : undefined
  award.img = award.img ? base.img : undefined
  award.description = award.description ? base.description : undefined
  await award.save()
}
