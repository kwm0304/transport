const mongoose = require('mongoose')
const { Schema } = mongoose;
const customerSchema = new Schema({
  last: {type: String},
  first: {type: String},
  address: {type: String, required: true},
  number: {type: Number}
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;