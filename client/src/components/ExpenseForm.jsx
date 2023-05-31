import { useState } from "react"

const ExpenseForm = () => {
  const [amount, setAmount] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
  }
return(
  <>
  <form className="border-1 border-solid border-blue-900 text-blue-900" onSubmit={handleSubmit}>
    <div className="flex mt-4 ml-6">
      <label className="font-semibold">Add Expense</label>
      <select className="ml-4 border-2 border-solid border-gray-300 ">
        <option value='fuel'>Fuel</option>
        <option value='food'>Food</option>
        <option value='repair'>Repair</option>
        <option value='labor'>Labor</option>
        <option value='other'>Other</option>
      </select>
      <label className="font-semibold ml-4">Amount</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-16 border-2 border-solid border-gray-300 ml-4 text-center"></input>
    </div>
  </form>
  </>
)
}
export default ExpenseForm