//today, week, month, year
//expenses
import { useContext, useEffect } from 'react'
import { EventContext } from '../context/EventContext'
import { useAuthContext } from '../hooks/useAuth'
import moment from 'moment'

const RevenueTotal = () => {
  const { user } = useAuthContext()
  const { events = [{}], dispatch1 } = useContext(EventContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('api/events', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        dispatch1({ type: 'SET_EVENTS', payload: data })
      
      } catch (error) {
        console.error('Error fetching events', error)
      }
    }
    fetchEvents()
  },[dispatch1, user])

  const today = moment().startOf('day')
  console.log(today)

  const calculateTotalPrice = (period) => {
    if (events.length === 0) {
      return 0;
    }
  
    const totalPrice = events.events.reduce((total, event) => {
      const eventDate = moment(event.start).startOf('day');
      const currentYear = moment().year()
      const eventPrice = isNaN(event.price) ? 0 : event.price;
      if (period === 'today' && eventDate.isSame(today, 'day')) {
        return total + eventPrice;
      } else if (period === 'week' && eventDate.isSame(today, 'week')) {
        return total + eventPrice;
      } else if (period === 'month' && eventDate.isSame(today, 'month')) {
        return total + eventPrice;
      } else if (period === 'year' && eventDate.year() === currentYear) {
        return total + eventPrice;
      }
      return total;
    }, 0);
  
    return totalPrice;
  };
  console.log(calculateTotalPrice('day'))
  return (
    <div className='text-center text-blue-900'>
      <h2 className='font-bold text-xl'>Revenues</h2>
      <div>
        <h3 className='font-semibold text-lg'>Week:</h3>
        <p className='text-red-500'>{calculateTotalPrice('week')}</p>
        <h3 className='font-semibold text-lg'>Month:</h3>
        <p className='text-red-500'>{calculateTotalPrice('month')}</p>
        <h3 className='font-semibold text-lg'>Year:</h3>
        <p className='text-red-500'>{calculateTotalPrice('year')}</p>
        
      </div>
    </div>
  );
};

export default RevenueTotal;
