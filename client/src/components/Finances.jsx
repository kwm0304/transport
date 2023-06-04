import ExpenseTotals from "./ExpenseTotals"
import RevenueTotal from "./RevenueTotals"
import { Link } from 'react-router-dom'

const Finances = () => {
  return(
    <>
    <Link to='/expenses' >
      <button className='text-white bg-blue-900 px-2 mt-6  ml-6 rounded-lg font-semibold'>Expenses</button>
    </Link>
    <h2 className="text-blue-900 text-center text-2xl font-bold my-8">Finances</h2>
    <div className="grid grid-cols-2">
      <ExpenseTotals />
      <RevenueTotal />
    </div>
    </>
  )
}

export default Finances