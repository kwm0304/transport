const mongoose = require('mongoose')
const Schema = mongoose.Schema
const phonebookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true})

module.exports = mongoose.model('Phonebook', phonebookSchema)