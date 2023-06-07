const Odometer = require('../models/odometerModel')
const mongoose = require('mongoose')

const getOdometers = async (req, res) => {
  const user_id = req.user._id
  const trips = await Odometer.find({ user_id }).sort({ createdAt: -1})
  res.status(200).json(trips)
}

const getOdometer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No odometer matches this id'})
  }
  const odometer = await Odometer.findById(id)
  if (!odometer) {
    return res.status(404).json({ error: 'No odometer matches this id'})
  }
  res.status(200).json(odometer)
}

const createOdometer = async (req, res) => {
  const {city, miles, _id} = req.body
  let emptyFields = []
  if (!city) {
    emptyFields.push('city')
  }
  if (!miles) {
    emptyFields.push('miles')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill out all fields', emptyFields})
  }
  try {
    const user_id = req.user._id
    const odometer = await Odometer.create({ city, miles, user_id })
    res.status(200).json(odometer)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateOdometer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No odometer matches this id'})
  }
  const odometer = await Odometer.findOneAndUpdate({ _id: id })
  if (!odometer) {
    return res.status(400).json({ error: 'No odometer matches this id'})
  }
  res.status(200).json(odometer)
}

const deleteOdometer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No odometer matches this id'})
  }
  const odometer = await Odometer.findByIdAndDelete({ _id: id })
  if (!odometer) {
    return res.status(400).json({ error: 'No odometer matches this id'})
  }
  res.status(200).json(odometer)
}

module.exports = {
  getOdometers,
  getOdometer,
  createOdometer,
  updateOdometer,
  deleteOdometer
}