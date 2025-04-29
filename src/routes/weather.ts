import { Router, Request, Response } from 'express'

const router = Router()

export default router

router.get('/', get)

async function get(req: Request, res: Response) {
  res.send('hello world')
}
