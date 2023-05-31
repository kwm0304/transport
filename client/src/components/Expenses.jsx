import { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseDetails from './ExpenseDetail'

const Expenses = () => {
  //select expense type
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
    <button className='text-white bg-blue-900 px-2 py-1 rounded-lg mt-6 ml-6'>+Expense</button>
    <ExpenseForm handleSubmit={handleSubmit}/>
    <h2 className='text-center text-blue-900 text-2xl mt-8 font-bold'>Expenses</h2>
    <ExpenseDetails />
    </>
  )
}
export default Expenses