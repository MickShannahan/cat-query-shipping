import express from 'express'
import { socketProvider } from './SocketProvider'
import { Startup } from './Startup'
import { DbConnection } from './db/DbConfig'
import { logger } from './utils/Logger'
import { createServer } from 'http'

// create server & socketServer
const app = express()
const port = process.env.PORT || 3000

// Set Redirect for Heroku
if (process.env.NODE_ENV !== 'dev') {
  app.enable('trust proxy')
  app.use(function(req, res, next) {
    logger.log(req)
    if (!req.secure) {
      console.log('redirecting to https://', req.headers.host + req.url)
      return res.redirect('https://' + req.headers.host + req.url)
    }
    next()
  })
}

const httpServer = createServer(app)
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Establish Socket
socketProvider.initialize(httpServer)

// Connect to Atlas MongoDB
DbConnection.connect()

// Start Server
httpServer.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})
