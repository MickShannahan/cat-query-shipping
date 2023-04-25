import mongoose from 'mongoose'
import { logger } from '../utils/Logger'
import { ItemSchema } from '../models/Item.js'

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

export async function connectToProduction() {
  try {
    const db = await mongoose.createConnection(process.env.CONNECTION_STRING)
    db.model('Item', ItemSchema)
    logger.log('Connected to Production DB', process.env.CONNECTION_STRING)
    return db
  } catch (error) {
    logger.error(
      '[MONGOOSE CONNECTION ERROR]:',
      'Invalid connection string'
    )
  }
}
