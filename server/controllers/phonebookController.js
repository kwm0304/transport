const Phonebook = require('../models/phonebookModel')
const mongoose = require('mongoose')

const getPhonebooks = async (req, res) => {
  const user_id = req.user.user_id
  const phonebooks = await Phonebook.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(phonebooks)
}

const getPhonebook = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No phonebook matches this id'})
  }
  const phonebook = await Phonebook.findById(id)
  if (!phonebook) {
    return res.status(404).json({ error: 'No phonebook matches this id'})
  }
  res.status(200).json(phonebook)
}

const createPhonebook = async (req, res) => {
  const { newName, newNumber } = req.body

  let emptyFields = []
  if (!name) {
    emptyFields.push('name')
  } if (!number) {
    emptyFields.push('number')
  } if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const user_id = req.user.user_id
    const phonebook = await Phonebook.create({newName, newNumber, user_id})
    res.status(200).json(phonebook)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deletePhonebook = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No phonebook matches this id'})
  }
  const phonebook = await Phonebook.findOneAndDelete({_id: id})
  if (!phonebook) {
    return res.status(400).json({ error: 'No phonebook matches this id'})
  }
  res.status(200).json(phonebook)
}

const updatePhonebook = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No phonebook matches this id'})
  }
  const phonebook = await Phonebook.findOneAndUpdate({_id: id})
  if(!phonebook) {
    return res.status(400).json({error: 'No phonebook matches this id'})
  }
  res.status(200).json(phonebook)
}

module.exports = {
  createPhonebook,
  getPhonebooks,
  getPhonebook,
  deletePhonebook,
  updatePhonebook
}