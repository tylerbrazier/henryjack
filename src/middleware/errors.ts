import { Request, Response } from 'express'
import { HTTPError } from '../utils/errors.js'

export default function errHandler(err: Error,
                                   req: Request,
                                   res: Response,
                                   next: Function
                                  ): void {
  // This line is required by express
  // https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) return next(err)

  const status = (err instanceof HTTPError) ? err.status : 500

  res.status(status).send(err.message)
}
