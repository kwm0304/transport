import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useEventContext } from '../hooks/useEventContext'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import { PieChart } from 'react-minimal-pie-chart'


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
    <Tabs>
      <TabList>
        <Tab >Expenses</Tab>
        <Tab>Revenues</Tab>
      </TabList>
      <TabPanel >
        <div className='bg-blue-900 text-white'>
          <Tabs>
            <TabList>
              <Tab>Week</Tab>
              <Tab>Month</Tab>
              <Tab>Year</Tab>
            </TabList>
          </Tabs>
        </div>
      </TabPanel>
      <TabPanel>
      <div className='bg-blue-900 text-white'>
          <Tabs>
            <TabList>
              <Tab>Week</Tab>
              <Tab>Month</Tab>
              <Tab>Year</Tab>
            </TabList>
          </Tabs>
        </div>
      </TabPanel>
    </Tabs>
    </>
  )
}

export default Analytics