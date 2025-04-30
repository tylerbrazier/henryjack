import express from 'express'
import weatherRouter from './routes/weather.js'

const app = express()

export default app

app.use('/', weatherRouter)
