import { FaTrash } from "react-icons/fa"
import { useAuthContext } from "../hooks/useAuth"

const ExpenseDetails = ({ expense }) => {
  const { user } = useAuthContext()

  const handleClick = async (e) => {
    e.preventDefault()
    if (!user) return
    
  }
  return (
    <>
    <div className="flex gap-4 mx-4 justify-center mt-4 border-2 border-blue-900 border-solid rounded-lg items-center text-blue-900 ">
      <p>Expense.name</p>
      <p>Expense.amount</p>
      <p>Expense.type</p>
      <button onClick={handleClick}><FaTrash /></button>
    </div>
    </>
  )
}
export default ExpenseDetails