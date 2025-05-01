import assert from 'node:assert/strict'
import { test, suite, before, after } from 'node:test'
import { start, stop } from './utils/server.js'
import { Server } from 'node:http'
import mockOWM from './utils/openweathermock.js'
import { setTemp, setDescription, setAlerts } from './utils/openweathermock.js'
import app from '../app.js'

let mockEndpoint: Server
let testServer: Server

suite('weather', async () => {
  before(beforeHook)
  after(afterHook)

  test('hot and humid, tornado watch!', async () => {
    setTemp(100)
    setDescription('humid')
    setAlerts(['tornado watch!'])

    const resp = await fetch('http://localhost:8080?lat=40&lon=40')
    assert(resp.ok)

    const json = await resp.json()
    const expect = {
      weather: 'hot and humid',
      alerts: [ 'tornado watch!' ]
    }

    assert.deepStrictEqual(json, expect)
  })

  // TODO add more tests
})

async function beforeHook(): Promise<void> {
  testServer = await start(app, 8080)
  mockEndpoint = await start(mockOWM, 8888)
}

async function afterHook(): Promise<void> {
  await stop(testServer)
  await stop(mockEndpoint)
}
