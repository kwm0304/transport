const mongoose = require('mongoose')

const Schema = mongoose.Schema
const odometerSchema = new Schema({
  city: { type: String, required: true},
  miles: {type: Number, required: true},
}, {timestamps: true})

module.exports = mongoose.model('Odometer', odometerSchema)