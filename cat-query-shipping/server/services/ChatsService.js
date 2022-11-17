import Cat from 'catid'
import { dbContext } from '../db/DbContext'
import { socketProvider } from '../SocketProvider'

class ChatsService {
  async getAll(query = {}) {
    return await dbContext.Chats.find(query)
  }

  async getOne(query) {
    return await dbContext.Chats.findOne({ $or: [{ _id: query }, { title: query }] })
  }

  async create(body) {
    return await dbContext.Chats.create(body)
  }

  async update(body) {
    return await dbContext.Chats.findByIdAndUpdate(body.id, body, { new: true })
  }

  async remove(id) {
    await dbContext.Chats.findByIdAndRemove(id)
    return 'deleted chat'
  }

  // Checks
  // FIXME this has to change
  async employeeFeedback(account, oldAccount = {}, reason = 'no reason') {
    // did you print a ton of pages
    if (account.currentPagesPrinted > 149) { account.scolded.push('too-many-pages') }
    if (account.currentPagesPrinted > 100 && howManyTimes(account.scolded, 'too-many-pages') === 1) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'Too Many Pages': { text: `How's it going in here kid? looks like you've printed out ${account.currentPagesPrinted} pages so far looking for this shipment. Don't worry I'm not going to get the Sustainable Search Department involved but that's more than quite a few pages.  When making your queries try searching by the more unique properties first, like the recipients name or the shipping date. ` } } })
      return
    } else if (account.currentPagesPrinted > 149 && howManyTimes(account.scolded, 'too-many-pages') === 5) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'Too Many Pages': { text: 'Here let me hav a look at your printer really quick I think there is an issue with it....... uh... hmmmmm... ok so looks like it\'s working just fine.  Looking at the printer log it looks like you are just not making, very great searches... Again.' } } })
      return
    } else if (account.currentPagesPrinted > 149 && howManyTimes(account.scolded, 'too-many-pages') === 10) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'Too Many Pages': { text: `What am I looking at here kid? something like ${account.currentPagesPrinted} pages for this search? That brings your total pages printed to roughly ${account.totalPagesPrinted}.  At Some point the Post Master General is going to take notice of the giant manifest wads we're launching out our garbage port, and I don't want to be the one to tell him it's you making them...` } } })
      return
    } else if (account.currentPagesPrinted > 200 && howManyTimes(account.scolded, 'too-many-pages') === 20) {
      const newName = Cat.getName()
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'Too Many Pages': { text: `Ok, so here's the deal kid, I can't keep pretending like you printing all these pages is ok. Less trees were destroyed by the 193U-Solar flare on Earth II a couple cycles ago compared to this printer you've got here registered to you... The Postmaster is already breathing down my neck when it comes to staff efficiencies with our budget. If he see's these logs and realized I didn't do something we will both be moved to the mail room out in the Kuiper belt. So if anyone asks, you're not ${account.name}, you're now ${newName}. got that? I'll handle the paperwork. Just please...please stop printing so much.` } } })
      account.name = newName
      account.scolded.push('name-change')
      return
    }
    // too many requests
    if (account.currentRequestsMade > 7 && !account.scolded.includes('too-many-requests')) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'Too Many Requests': { text: `Havin' trouble finding what you need? Make sure your search is formatted properly or the response could return nothing, inversely it could return everything.  I don't think I to tell you this but we generally expect employees to find shipments sooner than ${account.currentRequestsMade} pings.  Good luck.` } } })
      account.scolded.push('too-many-requests')
      return
    }
    // empty query
    if (reason === 'no query' && account.shipmentsFound.length < 25 && account.shipmentsFound.length > 5 && !account.scolded.includes('no-query-1')) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'No Query': { text: 'I understand you are new but I think it goes without saying that hitting the search button without entering a query is not a very efficient method to find the shipment...' } } })
      account.scolded.push('no-query-1')
    } else if (reason === 'no query' && account.shipmentsFound.length > 40 && !account.scolded.includes('no-query-2')) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'No Query': { text: 'Ummmm, kid are you feeling alright? you just hit the search button without entering a query and well I know you know better than that... Maybe in the future, you know, avoid doing that?' } } })
      account.scolded.push('no-query-2')
      return
    }

    // Dropped Grade
    if (oldAccount.employeeGrade !== 'C' && oldAccount.employeeGrade !== 'B' && account.employeeGrade === 'D' && !account.scolded.includes('d-grade')) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'D Grade': { text: `Uh yikes, what happened there kid? You were doing so good there at a ${oldAccount.employeeGrade} grade, now your down to a D... It hurts me to update your performance report with this but...Union requires me to.` } } })
      account.scolded.push('d-grade')
      return
    }

    // High Grade
    if (account.grade === 'S' && account.praised.includes('s-grade')) {
      socketProvider.messageUser(account.id, 'boz:notification', { data: account, chat: { 'S Grade': { text: `Woah! I almost don't believe it but after ${account.shipmentsFound.length} shipments recovered, you've made it to S grade.  Great job kid, it's a hard grade to achieve and an even harder one to keep.  ` } } })
      account.scolded.push('s-grade')
    }
  }
}

export const chatsService = new ChatsService()

function howManyTimes(arr, instance) {
  return arr.filter(e => e === instance).length
}
