const Phonebook = require('../models/phonebook')
const mongoose = require('mongoose')

const getPhonebooks = async (req, res) => {
  const user_id = req.user._id;
  const phonebooks = await Phonebook.find({ user_id }).sort({ createdAt: -1 })
  res.status(200).json(phonebooks)
};

const getPhonebook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No phonebook matches this id' })
  }
  const phonebook = await Phonebook.findById(id)
  if (!phonebook) {
    return res.status(404).json({ error: 'No phonebook matches this id' })
  }
  return res.status(200).json(phonebook)
};

const createPhonebook = async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: 'Please provide a name and number' })
  }
  try {
    const user_id = req.user._id
    const phonebook = await Phonebook.create({ name, number, user_id })
    res.status(200).json(phonebook)
  } catch(error) {
    res.status(400).json ({ error: error.message })
  }
}

const deletePhonebook = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No phonebook matches this id' })
  }
  const phonebook = await Phonebook.findOneAndDelete({ _id: id })
  if (!phonebook) {
    return res.status(400).json({ error: 'No phonebook matches this id' })
  }
  return res.status(200).json(phonebook)
}

const updatePhonebook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No phonebook matches this id' })
  }
  const phonebook = await Phonebook.findOneAndUpdate({ _id: id}, { ...req.body })
  if (!phonebook) {
    return res.status(400).json({ error: 'No phonebook matches this id' })
  }
  res.status(200).json(phonebook)
}

module.exports = {
  createPhonebook,
  getPhonebook,
  getPhonebooks,
  deletePhonebook,
  updatePhonebook
}