import express from 'express'

const { LISTEN_PORT } = process.env

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(LISTEN_PORT, () => {
  console.log(`Example app listening on port ${LISTEN_PORT}`)
})
