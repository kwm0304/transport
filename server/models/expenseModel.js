const mongoose = require('mongoose')

const Schema = mongoose.Schema
const expenseSchema = new Schema({
  amount: { type: Number, required: true},
  type: {type: String, required: true},
}, {timestamps: true})

module.exports = mongoose.model('Expense', expenseSchema)