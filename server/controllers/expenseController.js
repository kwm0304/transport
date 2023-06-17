const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

const getExpenses = async (req, res) => {
  const user_id = req.user._id
  console.log('req.use', req.user)
  const expenses = await Expense.find({ user_id }).sort({ createdAt: -1})
  res.status(200).json(expenses)
}

const getExpense = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No expense matches this id'})
  }
  const expense = await Expense.findById(id)
  if (!expense) { 
    return res.status(400).json({ error: 'No expense matches this id'})
  }
  return res.status(200).json(expense)
}

const createExpense = async (req, res) => {
  const { amount, type } = req.body;
  let emptyFields = [];
  if (!amount) {
    emptyFields.push("amount")
  } if (!type) {
    emptyFields.push("type")
  } 
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill out all fields", emptyFields})
  }
  try {
    const user_id = req.params.user_id;
    const expense = await Expense.create({ amount, type,  user_id })
    res.status(200).json(expense)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No expense matches this id'})
  }
  const expense = await Expense.findOneAndUpdate({ _id: id })
  if (!expense) {
    return res.status(400).json({ error: 'No expense matches this id'})
  }
  res.status(200).json(expense)
}

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No expense matches this id' })
  }
  const expense = await Expense.findByIdAndDelete({ _id: id })
  if (!expense) {
    return res.status(400).json({ error: 'No expense matches this id'})
  }
  res.status(200).json(expense)
}

module.exports = {
  createExpense,
  getExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};