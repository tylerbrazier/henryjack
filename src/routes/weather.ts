import { Router, Request, Response } from 'express'
import { HTTPError } from '../utils/errors.js'
import { get } from '../utils/api.js'

const router = Router()

export default router

router.get('/', route)

async function route(req: Request, res: Response) {
  validate(req)
  const lat = Number(req.query.lat)
  const lon = Number(req.query.lon)

  res.json(await get(lat, lon))
}

function validate(req: Request): void {
  if (!req?.query?.lat) throw new HTTPError('?lat required', 400)
  if (!req?.query?.lon) throw new HTTPError('?lon required', 400)
}
