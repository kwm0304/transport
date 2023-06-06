require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/user')
const phonebookRoutes = require('./routes/phonebook')
const expenseRoutes = require('./routes/expenses')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log('reqpath', req.path, 'reqmethod', req.method)
  next()
})

//Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.get('/key', (req, res) => res.send({ apiKey: process.env.GOOGLE_MAPS_API_KEY }))
app.use('/api/events', eventRoutes)
app.use('/api/user', userRoutes)
app.use('/api/contacts', phonebookRoutes)
app.use('/api/expenses', expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })