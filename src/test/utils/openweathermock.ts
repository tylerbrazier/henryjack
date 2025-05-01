// mock app for openweathermap.org

import express from 'express'
import { Request, Response } from 'express'

let temp = 0
let description = ''
let alerts: object[] | undefined

const app = express()

export default app

app.get('/', mockRoute)

function mockRoute(req: Request, res: Response): void {
  res.json({
    current: {
      temp,
      weather: [{ description }],
    },
    alerts,
  })
}

export function setTemp(t: number): void {
  temp = t
}

export function setDescription(d: string): void {
  description = d
}

export function setAlerts(a: string[]): void {
  alerts = a.map(s => ({ description: s }))
}
