const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String
  }  
}, {timesatamps: true})

module.exports = mongoose.model('Event', eventSchema)