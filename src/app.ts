import express from 'express'
import weatherRouter from './routes/weather.js'
import notFound from './middleware/404.js'
import errHandler from './middleware/errors.js'

const app = express()

export default app

app.use('/', weatherRouter)
app.use(notFound)
app.use(errHandler)
