import app from './app.js'
import { createServer } from 'node:http'
import { log } from './utils/logger.js'
import conf from './utils/conf.js'

createServer(app).listen(conf.LISTEN_PORT, () => {
  log(`Listening on ${conf.LISTEN_PORT}`)
})
