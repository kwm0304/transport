import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useEventContext } from '../hooks/useEventContext'

const Analytics = () => {
  const { user } = useAuthContext()
  const { dispatch: dispatchExpense } = useExpenseContext()
  const { dispatch1: dispatchEvent } = useEventContext()

  useEffect(() => {
    const fetchExpensesandRevenues = async() => {
      try {
      const expenseResponse = await fetch('/api/expenses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const expenseData = await expenseResponse.json();
      dispatchExpense({ type: 'SET_EXPENSES', payload: expenseData})
    
    const eventResponse = await fetch('/api/events', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const eventData = await eventResponse.json()
    dispatchEvent({type: 'SET_EVENTS', payload: eventData})
    } catch (error) {
      console.error('Error fetching', error)
    }
  }
  if (user) {
    fetchExpensesandRevenues()
  }
  }, [dispatchEvent, dispatchExpense, user])
  
  return (
    <>
    <h2 className="text-center text-blue-900 font-bold text-2xl my-8">Analytics</h2>

    </>
  )
}

export default Analytics