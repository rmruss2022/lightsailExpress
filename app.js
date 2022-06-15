const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 3030

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => console.log('Connected to mongodb'))

app.use(express.json())

const subscriberRouter = require('./routes/subscriber')
app.use('/subscriber', subscriberRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
