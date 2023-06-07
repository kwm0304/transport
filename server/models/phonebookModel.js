const mongoose = require('mongoose')
const Schema = mongoose.Schema
const phonebookSchema = new Schema({
  newName: {
    type: String,
    required: true
  },
  newNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true})

module.exports = mongoose.model('Phonebook', phonebookSchema)