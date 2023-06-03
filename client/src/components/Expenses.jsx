import { useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseDetails from './ExpenseDetail'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useAuthContext } from '../hooks/useAuth'

const Expenses = () => {
  const { expenses=[] , dispatch } = useExpenseContext()
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
    if (user) {
    fetchExpenses()
    }
  }, [dispatch, user])
  //select expense type
  let expenseArray = []
  expenseArray.push(expenses)
  
  
  return (
    <>
    <ExpenseForm expenses={expenses}/>
    <div className='mapping'>
      {expenseArray && expenseArray.map(expense => (
        <ExpenseDetails key={expense._id} expense={expense} />
      ))}
    </div>
    </>
  )
}
export default Expenses