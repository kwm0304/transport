import { FaTrash } from "react-icons/fa"
import { useAuthContext } from "../hooks/useAuth"
import { useExpenseContext } from "../hooks/useExpenseContext"

const ExpenseDetails = ({ expense }) => {
  const { user } = useAuthContext()
  const { dispatch } = useExpenseContext()

  const handleClick = async (e) => {
    e.preventDefault()
    if (!user) return
    const response = await fetch('/api/expenses/' + expense._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log('delete expense', response)
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_EXPENSE', payload: json})
    }
    
  }
  const today = new Date()
  console.log(today)
  const cleanToday = today.toDateString()
  return (
    <>
    <div className="flex gap-4 mx-4 justify-center mt-4 border-2 border-blue-900 border-solid rounded-lg items-center text-blue-900 ">
      <p>{cleanToday}</p>
      <p>${expense.amount}</p>
      <p>{expense.type}</p>
      <button onClick={handleClick}><FaTrash /></button>
    </div>
    </>
  )
}
export default ExpenseDetails