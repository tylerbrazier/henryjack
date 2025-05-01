// API client for openweathermap.org

import conf from './conf.js'
import { Coordinates, Weather } from './classes.js'

const EXCLUDE = 'minutely,hourly,daily'

export default async function api(coordinates: Coordinates): Promise<Weather> {

  const { lat, lon } = coordinates

  const q = '?' + [
    `lat=${lat}`,
    `lon=${lon}`,
    `exclude=${EXCLUDE}`,
    `appid=${conf.OWM_API_KEY}`,
    'units=imperial',
  ].join('&')

  const resp = await fetch(conf.OWM_API_URL + q)

  return resp.json()
}
