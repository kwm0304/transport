//today, week, month, year
//expenses
import { useContext, useEffect } from 'react'
import { EventContext } from '../context/EventContext'
import { ExpenseContext } from '../context/ExpenseContext'
import { useAuthContext } from '../hooks/useAuth'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Finances = () => {
  const { user } = useAuthContext()
  const { events = {events: []}, dispatch1 } = useContext(EventContext)  
  const { expenses = {expenses: [{}]}, dispatch} = useContext(ExpenseContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventResponse = await fetch('api/events', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const eventData = await eventResponse.json()
        dispatch1({ type: 'SET_EVENTS', payload: eventData })

        const expenseResponse = await fetch('api/expenses', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const expenseData = await expenseResponse.json()
        dispatch({ type: 'SET_EXPENSES', payload: expenseData })

      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [dispatch1, dispatch, user])
  console.log('expensetype', expenses)
  console.log('eventType', events)

  const today = moment().startOf('day')
  const calculateTotal = (period, data) => {
    if (!data || data.length === 0) {
      return 0
    }

    const total = data.reduce((acc, item) => {
      const itemDate = moment(item.start).startOf('day')
      if (itemDate.isSame(today, period)) {
        return acc + item.price
      }
      return acc
    }, 0)

    return total
  }

  const totalExpenses = calculateTotal('day', expenses.expenses)
  const totalPrice = calculateTotal('day', events.events)
  console.log('totalexpenses', totalExpenses)
  console.log('totalprice', totalPrice)
  //revenues
  const totalYearPrice = calculateTotal('year', events.events)
  const totalMonthPrice = calculateTotal('month', events.events)
  const totalWeekPrice = calculateTotal('week', events.events)
  const totalDayPrice = calculateTotal('day', events.events)
  //expenses
  const totalYearExpense = calculateTotal('year', expenses.expenses)
  const totalMonthExpense = calculateTotal('month', expenses.expenses)
  const totalWeekExpense = calculateTotal('week', expenses.expenses)
  const totalDayExpense = calculateTotal('day', expenses.expenses)
  
  return(
    <div className="py-2">
      <Link to='/expenses'>
      <button className='text-white bg-blue-900 px-2 py-1 ml-6 rounded-lg font-semibold'>Expenses</button>
      </Link>
    <h2 className="text-blue-900 font-bold text-3xl text-center mb-10 mt-12">Finances</h2>
    <h3 className="text-center font-bold text-2xl mb-4 text-blue-900">Revenue</h3>
    <div className="grid grid-cols-5  mr-8 gap-4 text-end text-blue-900">
      <p></p>
      <div className="grid grid-cols-1 font-bold text-end text-xl">
      <p>Day</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-6">
      <p>Week</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-5">
      <p className="">Month</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-8">
      <p>Year</p>
      </div>
    </div>
    <div className="grid grid-cols-5 rounded-lg border-4  py-2 mx-2 border-blue-900 text-blue-600 place-items-center text-center">
      <div className="grid grid-cols-1 font-bold text-blue-900">
        <h4>Jobs</h4>
        <h4>Tips</h4>
        <h4 className="text-green-500">Total</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalDayPrice}</h4>
        <h4>$20</h4>
        <h4 className="text-green-500">$220</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalWeekPrice}</h4>
        <h4>$100</h4>
        <h4  className="text-green-500">$1100</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalMonthPrice}</h4>
        <h4>$400</h4>
        <h4  className="text-green-500">$4400</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalYearPrice}</h4>
        <h4>$4800</h4>
        <h4  className="text-green-500">$52800</h4>
      </div>
    </div>
    <h3 className="text-center font-bold text-2xl mt-8 mb-4 text-blue-900">Expenses</h3>
    <div className="grid grid-cols-5  mr-8 gap-4 text-end text-blue-900">
      <p></p>
      <div className="grid grid-cols-1 font-bold text-end text-xl">
      <p>Day</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-6">
      <p>Week</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-5">
      <p className="">Month</p>
      </div>
      <div className="grid grid-cols-1 font-bold text-xl ml-8">
      <p>Year</p>
      </div>
    </div>
    <div className="grid grid-cols-5 rounded-lg border-4  py-2 mx-2 border-blue-900 text-blue-600 place-items-center text-center">
      <div className="grid grid-cols-1 font-bold text-blue-900">
        <h4>Fuel</h4>
        <h4>Repairs</h4>
        <h4>Labor</h4>
        <h4>Insurance</h4>
        <h4 className="text-red-500">Total</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalDayExpense}</h4>
        <h4>$20</h4>
        <h4 >$120</h4>
        <h4>$200</h4>
        <h4  className="text-red-500">$340</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalWeekExpense}</h4>
        <h4>$100</h4>
        <h4>$100</h4>
        <h4 >$1100</h4>
        <h4  className="text-red-500">$2200</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalMonthExpense}</h4>
        <h4>$400</h4>
        <h4>$400</h4>
        <h4 >$4400</h4>
        <h4  className="text-red-500">$8800</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${totalYearExpense}</h4>
        <h4>$10000</h4>
        <h4>$10000</h4>
        <h4 >$30000</h4>
        <h4  className="text-red-500">$40000</h4>
      </div>
    </div>
    <h3 className="text-center font-bold text-2xl mt-8 mb-4 text-blue-900">Expenses</h3>
    <div className="border-4 border-solid border-blue-900 rounded-lg mx-24 content-center grid">
    <div className="grid grid-cols-5 text-blue-900 font-bold h-24 content-center ">
      <p></p>
      <div className="grid">
        <p>Day</p>
        <p>$100</p>
      </div>
      <div className="grid">
        <p>Week</p>
        <p>$2200</p>
      </div>
      <div className="grid">
        <p>Month</p>
        <p>$7000</p>
      </div>
      <div className="grid">
        <p className="">Year</p>
        <p>$75000</p>
      </div>
    </div>
    </div>
    </div>
  )
  }
  export default Finances