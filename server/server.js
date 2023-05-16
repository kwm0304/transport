require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log('reqpath', req.path, 'reqmethod', req.method)
  next()
})
app.use('/api/events', eventRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log('listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })