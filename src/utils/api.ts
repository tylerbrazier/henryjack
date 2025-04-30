// API client for openweathermap.org

import conf from './conf.js'
import { HTTPError } from './errors.js'

const ROUTE = 'https://api.openweathermap.org/data/3.0/onecall'
const EXCLUDE = 'current,minutely,hourly,daily,alerts'
const MAX_LAT = 90
const MAX_LON = 180
const MIN_LAT = -MAX_LAT
const MIN_LON = -MAX_LON

export async function get(lat: number, lon: number): Promise<object> {

  validate(lat, lon)

  const q = `?lat=${lat}&lon=${lon}&exclude=${EXCLUDE}&appid=${conf.API_KEY}`

  const resp = await fetch(ROUTE + q)

  return resp.json()
}

function validate(lat: number, lon: number): void {
  let messages: string[] = []

  if (lat > MAX_LAT || lat < MIN_LAT) messages.push(`${MIN_LAT} <= lat <= ${MAX_LAT}`)
  if (lon > MAX_LON || lon < MIN_LON) messages.push(`${MIN_LON} <= lon <= ${MAX_LON}`)

  if (messages.length) throw new HTTPError(messages.join('\n'), 400)
}
