import { useState } from "react"
import { useExpenseContext } from "../hooks/useExpenseContext"
import { useAuthContext } from "../hooks/useAuth"
import { FaPlus } from "react-icons/fa"

const ExpenseForm = () => {
  const [amount, setAmount] = useState(null)
  const [type, setType] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [showForm, setShowForm] = useState(false)
  const {  dispatch } = useExpenseContext()
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const expense = {amount, type}
    const response = await fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log('expense json', json)
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      dispatch({type: 'CREATE_EXPENSE', payload: json})
      setAmount(0)
      setType(null)
      setError(null)
      setEmptyFields([])
      setShowForm(false)
      console.log('New expense added')
      console.log('expense dispatch', dispatch)
    }
  }
  const handleShowForm = () => {
    setShowForm(!showForm)
  }
  console.log(emptyFields)
  console.log('amount', amount)
return(
  <>
  <h2 className='text-center text-blue-900 text-2xl mt-8 font-bold'>Expenses</h2>
  <button className='text-white bg-blue-900 px-2 py-1 rounded-lg mt-6 ml-6' onClick={handleShowForm}>+Expense</button>
  {showForm && (
  <form className="border-1 border-solid border-blue-900 text-blue-900" onSubmit={handleSubmit}>
    <div className="flex mt-4 ml-6">
      <label className="font-semibold">Add Expense</label>
      <select className="ml-4 border-2 border-solid border-gray-300" onChange={(e) => setType(e.target.value)}>
        <option value=''></option>
        <option value='fuel'>Fuel</option>
        <option value='food'>Food</option>
        <option value='repair'>Repair</option>
        <option value='labor'>Labor</option>
        <option value='other'>Other</option>
      </select>
      <label className="font-semibold ml-4">Amount</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-16 border-2 border-solid border-gray-300 ml-4 text-center"></input>
      <div className="flex items-center justify-center h-full text-center">
      <button className='bg-blue-900 flex items-center justify-center text-center text-white rounded-lg p-1 ml-2 text-xl rounded-full w-8 h-8'><FaPlus /></button>
      </div>
    </div>
    {error && <div className="error text-center text-red-500 font-semibold">{error}</div>}

  </form>
      )}
  </>
)
}
export default ExpenseForm