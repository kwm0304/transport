const Event = require('../models/eventModel')
const mongoose = require('mongoose')

const getEvents = async (req, res) => {
  const user_id = req.user._id
  const events = await Event.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(events)
}

const getEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No event matches this id'})
  }
  const event = await Event.findById(id)
  if(!event) {
    return res.status(404).json({error: 'No event matches this id'})
  }
  res.status(200).json(event)
  
}

const createEvent = async (req, res) => {
  const { title, start, end, first, last, price, address } = req.body
  console.log('reqbody again', req.body)
  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  } if (!start) {
    emptyFields.push('start')
  } if (!end) {
    emptyFields.push('end')
  } if (!first) {
    emptyFields.push('first')
  } if (!last) {
    emptyFields.push('last')
  } if (!price) {
    emptyFields.push('price')
  } if (!address) {
    emptyFields.push('address')
  }
   if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields})
  }

  try {
    const user_id = req.user._id
    const event = await Event.create({ title, start, end, user_id, first, last, price, address })
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(iid)) {
    return res.status(400).json({error: 'No event matches this id'})
  }
  const event = await Event.findOneAndDelete({_id: id})
  if (!event) {
    return res.status(400).json({error: 'No event matches this id'})
  }
  res.status(200).json(event)
}

const updateEvent = async(req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No event matches this id'})
  }
  const event = await Event.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!event) {
    return res.status(400).json({ error: 'No event matches this id'})
  }
  res.status(200).json(event)
}

module.exports = {
  createEvent, getEvent, getEvents, deleteEvent, updateEvent
}