import { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseDetails from './ExpenseDetail'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useAuthContext } from '../hooks/useAuth'

const Expenses = () => {
  const { expenses, dispatch } = useExpenseContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
      }
    }
    if (user)
    fetchExpenses()
  }, [dispatch, user])
  //select expense type
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  
  return (
    <>
    <ExpenseForm handleSubmit={handleSubmit}/>
    <div className='mapping'>
      {expenses && expenses.map(expense => (
        <ExpenseDetails key={expense._id} expense={expense} />
      ))}
    </div>
    </>
  )
}
export default Expenses