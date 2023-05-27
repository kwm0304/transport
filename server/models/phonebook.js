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
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

module.exports = Phonebook