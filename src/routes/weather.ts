import { Router, Request, Response } from 'express'
import { Coordinates, Weather } from '../utils/classes.js'
import api from '../utils/api.js'

const router = Router()

export default router

router.get('/', route)

async function route(req: Request, res: Response) {
  const json = await api(parseCoordinates(req))

  res.json({
    weather: describe(json),
    alerts: json?.alerts?.map(a => a.description) || null,
  })
}

// TODO maybe this belongs in a Weather class
function describe(weather: Weather): string {
  let feels = 'moderate'
  const { temp } = weather.current
  if (temp <= 40) feels = 'cold'
  if (temp >= 90) feels = 'hot'

  return `${feels} and ${weather.current.weather[0].description}`
}

function parseCoordinates(req: Request): Coordinates {
  const lat = Number(req?.query?.lat)
  const lon = Number(req?.query?.lon)
  return new Coordinates(lat, lon)
}
