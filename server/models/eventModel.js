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
  }  
}, {timesatamps: true})

module.exports = mongoose.model('Event', eventSchema)