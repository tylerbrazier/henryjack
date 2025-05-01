// API client for openweathermap.org

import conf from './conf.js'
import { Coordinates, Weather } from './classes.js'

const ROUTE = 'https://api.openweathermap.org/data/3.0/onecall'
const EXCLUDE = 'minutely,hourly,daily'

export default async function api(coordinates: Coordinates): Promise<Weather> {

  const { lat, lon } = coordinates

  const q = '?' + [
    `lat=${lat}`,
    `lon=${lon}`,
    `exclude=${EXCLUDE}`,
    `appid=${conf.API_KEY}`,
    'units=imperial',
  ].join('&')

  const resp = await fetch(ROUTE + q)

  return resp.json()
}
