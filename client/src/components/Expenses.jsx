import { useEffect } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseDetails from './ExpenseDetail'
import { useAuthContext } from '../hooks/useAuth'
import { useExpenseContext } from '../hooks/useExpenseContext'

const Expenses = () => {
  const { expenses=[{}] , dispatch } = useExpenseContext()
  const { user } = useAuthContext()
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_EXPENSES', payload: json})
        console.log('Dispatched w/ payload', json)
      }
    }
    if (user) {
    fetchExpenses()
    }
  }, [dispatch, user])
  //select expense type
  
  
  console.log('type', typeof expenses)
  
  
  
  return (
    <>
    <ExpenseForm expenses={expenses} />
    <div className='mapping'>
      {expenses && expenses.map((expense, index) => (
        <ExpenseDetails key={index} props={expense} amount={expense.amount} type={expense.type} createdAt={expense.createdAt} _id={expense._id}/>
      ))}
    </div>
    </>
  )
}
export default Expenses