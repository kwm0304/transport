//today, week, month, year
//expenses
import { useContext, useEffect } from 'react'
import { EventContext } from '../context/EventContext'
import { useAuthContext } from '../hooks/useAuth'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Finances = () => {
  const { user } = useAuthContext()
  const { events = {events: []}, dispatch } = useContext(EventContext)  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('api/events', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        dispatch({ type: 'SET_EVENTS', payload: data })
      
      } catch (error) {
        console.error('Error fetching events', error)
      }
    }
    fetchEvents()
  },[dispatch, user])

  const today = moment().startOf('day')

  const calculateTotalPrice = (period) => {
    if (events.length === 0) {
      return 0
    }

   const totalPrice = events.events.reduce((total, event) => {
    const eventDate = moment(event.start).startOf('day');
    if (period === 'today' && eventDate.isSame(today, 'day')) {
      return total + event.price
    } else if (period === 'week' && eventDate.isSame(today, 'week')) {
      return total + event.price
    } else if (period === 'month' && eventDate.isSame(today, 'month')) {
      return total + event.price;
    } else if (period === 'year' && eventDate.isSame(today, 'year')) {
      return total + event.price;
    }
    return total
  }, 0)
  return totalPrice
  }
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
        <h4 >${calculateTotalPrice('today')}</h4>
        <h4>$20</h4>
        <h4 className="text-green-500">$220</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${calculateTotalPrice('week')}</h4>
        <h4>$100</h4>
        <h4  className="text-green-500">$1100</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${calculateTotalPrice('month')}</h4>
        <h4>$400</h4>
        <h4  className="text-green-500">$4400</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >${calculateTotalPrice('year')}</h4>
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
        <h4 >$200</h4>
        <h4>$20</h4>
        <h4 >$120</h4>
        <h4>$200</h4>
        <h4  className="text-red-500">$340</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >$1000</h4>
        <h4>$100</h4>
        <h4>$100</h4>
        <h4 >$1100</h4>
        <h4  className="text-red-500">$2200</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >$4000</h4>
        <h4>$400</h4>
        <h4>$400</h4>
        <h4 >$4400</h4>
        <h4  className="text-red-500">$8800</h4>
      </div>
      <div className="grid grid-cols-1 font-bold">
        <h4 >$48000</h4>
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