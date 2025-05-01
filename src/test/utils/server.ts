// server that can be started and stopped for testing

import { Express } from 'express'
import { createServer, Server } from 'node:http'

export async function start(app: Express, port: number): Promise<Server> {
  return new Promise((resolve, reject) => {
    const server = createServer(app)
    server.on('err', reject)
    server.listen(port, () => resolve(server))
  })
}

export async function stop(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err)
      else resolve()
    })
  })
}
