import mongoose from 'mongoose'
import { logger } from '../utils/Logger'

mongoose.connection.on('error', err => {
  logger.error('[DATABASE ERROR]:', err)
})
mongoose.connection.on('connection', () => {
  logger.log('DbConnection Successful')
})

export class DbConnection {
  static async connect(connectionstring = process.env.NODE_ENV === 'dev' ? process.env.CONNECTION_STRING_DEV : process.env.CONNECTION_STRING || 'no string') {
    const status = 0
    try {
      const status = await mongoose.connect(connectionstring)
      logger.log('[CONNECTION TO DB SUCCESSFUL] => ', connectionstring)
      return status
    } catch (e) {
      logger.error(
        '[MONGOOSE CONNECTION ERROR]:',
        'Invalid connection string'
      )
      return status
    }
  }
}
