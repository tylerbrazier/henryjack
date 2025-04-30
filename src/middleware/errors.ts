import { Request, Response } from 'express'
import { ValidationError } from '../utils/classes.js'
import { log } from '../utils/logger.js'

export default function errHandler(err: Error,
                                   req: Request,
                                   res: Response,
                                   next: Function
                                  ): void {
  // This line is required by express
  // https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) return next(err)

  log(err)

  const status = (err instanceof ValidationError) ? err.status : 500

  res.status(status).send(err.message)
}
