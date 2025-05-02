import assert from 'node:assert/strict'
import { test, suite, before, after } from 'node:test'
import { start, stop } from './utils/server.js'
import { Server } from 'node:http'
import mockOWM from './utils/openweathermock.js'
import { setTemp, setDescription, setAlerts } from './utils/openweathermock.js'
import app from '../app.js'
import conf from '../utils/conf.js'

let mockEndpoint: Server
let testServer: Server
const host = `http://localhost:${conf.LISTEN_PORT}`

suite('weather', async () => {
  before(beforeHook)
  after(afterHook)

  test('hot and humid, tornado watch!', async () => {
    setTemp(100)
    setDescription('humid')
    setAlerts(['tornado watch!'])

    const resp = await fetch(`${host}?lat=40&lon=40`)
    assert(resp.ok)

    const json = await resp.json()
    const expect = {
      weather: 'hot and humid',
      alerts: [ 'tornado watch!' ]
    }

    assert.deepStrictEqual(json, expect)
  })

  test('cold if low temp', async () => {
    setTemp(-40)
    setDescription('snow')
    setAlerts()

    const resp = await fetch(`${host}?lat=40&lon=40`)
    assert(resp.ok)

    const json = await resp.json()
    const expect = { weather: 'cold and snow', alerts: null, }

    assert.deepStrictEqual(json, expect)
  })

  test('moderate if normal temp', async () => {
    setTemp(70)
    setDescription('comfortable')
    setAlerts()

    const resp = await fetch(`${host}?lat=40&lon=40`)
    assert(resp.ok)

    const json = await resp.json()
    const expect = { weather: 'moderate and comfortable', alerts: null, }

    assert.deepStrictEqual(json, expect)
  })

  test('error if no lat', async () => {
    const resp = await fetch(`${host}?lon=40`)
    assert(!resp.ok)
    assert.strictEqual(resp.status, 400)

    const json = await resp.json()

    assert.deepStrictEqual(Object.keys(json), [ 'error' ])
    assert.match(json.error, /lat/)
  })

  test('error if no lon', async () => {
    const resp = await fetch(`${host}?lat=40`)
    assert(!resp.ok)
    assert.strictEqual(resp.status, 400)

    const json = await resp.json()

    assert.deepStrictEqual(Object.keys(json), [ 'error' ])
    assert.match(json.error, /lon/)
  })

  test('error if invalid lat', async () => {
    let resp, json
    for (let lat of [ '91', '-91', 'not_number' ]) {
      resp = await fetch(`${host}?lat=${lat}&lon=40`)
      assert(!resp.ok)
      assert.strictEqual(resp.status, 400)

      json = await resp.json()

      assert.deepStrictEqual(Object.keys(json), [ 'error' ])
      assert.match(json.error, /lat/)
    }
  })

  test('error if invalid lon', async () => {
    let resp, json
    for (let lon of [ '181', '-181', 'not_number' ]) {
      resp = await fetch(`${host}?lat=40&lon=${lon}`)
      assert(!resp.ok)
      assert.strictEqual(resp.status, 400)

      json = await resp.json()

      assert.deepStrictEqual(Object.keys(json), [ 'error' ])
      assert.match(json.error, /lon/)
    }
  })

  // TODO move this into its own test file and DRY up the boilerplate
  test('404', async () => {
    const resp = await fetch(`${host}/nope`)
    assert(!resp.ok)
    assert.strictEqual(resp.status, 404)

    const json = await resp.json()

    assert.deepStrictEqual(Object.keys(json), [ 'error' ])
    assert.match(json.error, /not found/i)
  })

})

async function beforeHook(): Promise<void> {
  testServer = await start(app, 8080)
  mockEndpoint = await start(mockOWM, 8888)
}

async function afterHook(): Promise<void> {
  await stop(testServer)
  await stop(mockEndpoint)
}
