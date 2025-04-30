import { Router, Request, Response } from 'express'
import { Coordinates } from '../utils/classes.js'
import api from '../utils/api.js'

const router = Router()

export default router

router.get('/', route)

async function route(req: Request, res: Response) {
  res.json(await api(parseCoordinates(req)))
}

function parseCoordinates(req: Request): Coordinates {
  const lat = Number(req?.query?.lat)
  const lon = Number(req?.query?.lon)
  return new Coordinates(lat, lon)
}
