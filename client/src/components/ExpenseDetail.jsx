import { FaTrash } from "react-icons/fa"
import { useAuthContext } from "../hooks/useAuth"
import { useExpenseContext } from "../hooks/useExpenseContext"
import PropTypes from 'prop-types'


const ExpenseDetails = ({ amount, type, _id, createdAt }) => {
  
  const { user } = useAuthContext()
  const { dispatch } = useExpenseContext()

  const handleClick = async (e) => {
    e.preventDefault()
    if (!user) return
    const response = await fetch('/api/expenses/' + _id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log('ID', _id)
    console.log('delete expense', response)
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_EXPENSE', payload: json})
    }
    
  }
  console.log('amount', amount)
  console.log('type', type)
  return (
    <>
    <div className="flex gap-4 mx-4 justify-between mt-4 border-2 border-blue-900 border-solid rounded-lg items-center text-blue-900 " key={_id}>
      <p>{createdAt}</p>
      <p className="ml-4">${amount}</p>
      <p className="font-semibold">{type}</p>
      <button onClick={handleClick} className="mr-4"><FaTrash /></button>
    </div>
    </>
  )
}

ExpenseDetails.propTypes = {
    amount: PropTypes.number,
    type: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
  }

export default ExpenseDetails