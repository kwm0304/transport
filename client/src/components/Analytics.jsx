import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuth';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useEventContext } from '../hooks/useEventContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PieChart } from 'react-minimal-pie-chart';
import moment from 'moment';

const Analytics = () => {
  const { user } = useAuthContext();
  const { expenses, dispatch } = useExpenseContext();
  const { events, dispatch1 } = useEventContext();

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
    if (user) {
    fetchEvents()
    }
  },[dispatch1, user])

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_EXPENSES', payload: json });
      }
    };
    if (user) {
      fetchExpenses();
    }
  }, [dispatch, user]);

  const calculateTotal = (data, type) => {
    return data
      .filter(expense => expense.type === type)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateTotalRevenue = (data, type) => {
    return data
    .filter(event => event.title === type)
    .reduce((total, event) => {
      const eventPrice = isNaN(event.price) ? 0 : event.price;
      return total + eventPrice;
    }, 0)
  } 

  const getWeeklyExpenses = () => {
    const currentDate = moment();
    const currentWeek = currentDate.week();

    const weekExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.createdAt);
      return (
        expenseDate.week() === currentWeek &&
        expenseDate.year() === currentDate.year()
      );
    });

    const types = [...new Set(weekExpenses.map(expense => expense.type))];
    const totals = types.map(type => ({
      type,
      total: calculateTotal(weekExpenses, type)
    }));
    return totals;
  };

  const getMonthlyExpenses = () => {
    const currentDate = moment();
    const currentMonth = currentDate.month();

    const monthExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.createdAt);
      return (
        expenseDate.month() === currentMonth &&
        expenseDate.year() === currentDate.year()
      );
    });

    const types = [...new Set(monthExpenses.map(expense => expense.type))];
    const totals = types.map(type => ({
      type,
      total: calculateTotal(monthExpenses, type)
    }));

    return totals;
  };

  const getYearlyExpenses = () => {
    const currentDate = moment();
    const currentYear = currentDate.year();

    const yearExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.createdAt);
      return expenseDate.year() === currentYear;
    });
    const types = [...new Set(yearExpenses.map(expense => expense.type))];
    const totals = types.map(type => ({
      type,
      total: calculateTotal(yearExpenses, type)
    }));
    return totals;
  };
  
  const getWeeklyRevenuesByStore = () => {
    if (!Array.isArray(events.events)) { 
      return []
    }
    const currentDate = moment();
    const currentWeek = currentDate.week();

    const weekRevenues = events.events.filter(event => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return (
        eventStart.week() === currentWeek &&
        eventStart.year() === currentDate.year() &&
        eventEnd.year() === currentDate.year()
      );
    });

    const stores = [...new Set(weekRevenues.map(event => event.title))];
    const totals = stores.map(store => ({
      store,
      amount: calculateTotalRevenue(weekRevenues, store)
    }));
    return totals;
  };

  const getMonthlyRevenuesByStore = () => {
    if (!Array.isArray(events.events)) { 
      return []
    }
    const currentDate = moment();
    const currentMonth = currentDate.month();

    const monthRevenues = events.events.filter(event => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return (
        eventStart.month() === currentMonth &&
        eventStart.year() === currentDate.year() &&
        eventEnd.year() === currentDate.year()
      );
    });

    const stores = [...new Set(monthRevenues.map(event => event.title))];
    const totals = stores.map(store => ({
      store,
      amount: calculateTotalRevenue(monthRevenues, store)
    }));
    return totals;
  };

  const getYearlyRevenuesByStore = () => {
    if (!Array.isArray(events.events)) { 
      return [{}]
    }
    const currentDate = moment();
    const currentYear = currentDate.year();

    const yearRevenues = events.events.filter(event => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return (
        eventStart.year() === currentYear &&
        eventEnd.year() === currentYear
      );
    });

    const stores = [...new Set(yearRevenues.map(event => event.title))];
    const totals = stores.map(store => ({
      store,
      amount: calculateTotalRevenue(yearRevenues, store)
    }));
    totals.sort((a, b) => b.amount - a.amount)
    return totals.slice(0, 10);
  };

  const defaultLabelStyle = {
    fontSize: '4.5px',
    fontFamily: 'sans-serif',
    fill: 'black',
  }

  const customLabel = ({ dataEntry }) => {
    const radius = 50;
    const angle = (dataEntry.startAngle + dataEntry.endAngle) / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
  
    const validX = isNaN(x) ? 0 : x;
    const validY = isNaN(y) ? 0 : y;
  
    const dx = 10;
    const dy = 5;
  
    return (
      <text x={validX + dx} y={validY + dy} fill="black" textAnchor="middle">
        {dataEntry.title}
      </text>
    );
  };
  
  return (
    <>
      <h2 className="text-center text-blue-900 font-bold text-2xl my-8">Analytics</h2>
      <Tabs>
        <TabList>
          <Tab>Expenses</Tab>
          <Tab>Revenues</Tab>
        </TabList>
        <TabPanel>
          <div>
            <Tabs>
              <TabList>
                <Tab>Week</Tab>
                <Tab>Month</Tab>
                <Tab>Year</Tab>
              </TabList>
              <TabPanel>
                <div>
                  <PieChart
                    className='px-4 pt-8'
                    labelStyle={defaultLabelStyle}
                    label={customLabel}
                    data={getWeeklyExpenses().map(expense => ({
                      label: expense.type,
                      
                      title: expense.type,
                      value: expense.total,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each expense type
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <PieChart
                    className='px-4 pt-8'
                    labelStyle={defaultLabelStyle}
                    label={({ dataEntry }) => `${dataEntry.title}`}
                    data={getMonthlyExpenses().map(expense => ({
                      toolTip: expense.type,
                      label: expense.type,
                      title: expense.type,
                      value: expense.total,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each expense type
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <PieChart
                  className='px-4 pt-8'
                  labelStyle={defaultLabelStyle}
                  label={({ dataEntry }) => `${dataEntry.title}`}
                    data={getYearlyExpenses().map(expense => ({
                      title: expense.type,
                      value: expense.total,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each expense type
                    }))}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <Tabs>
              <TabList>
                <Tab>Week</Tab>
                <Tab>Month</Tab>
                <Tab>Year</Tab>
              </TabList>
              <TabPanel>
                <div>
                  <PieChart
                    className='px-4 pt-8'
                    labelStyle={defaultLabelStyle}
                    label={({ dataEntry }) => `${dataEntry.title}`}
                    data={getWeeklyRevenuesByStore().map(revenue => ({
                      title: revenue.store,
                      value: revenue.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each store
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <PieChart
                  className='px-4 pt-8'
                  labelStyle={defaultLabelStyle}
                  label={({ dataEntry }) => `${dataEntry.title}`}
                    data={getMonthlyRevenuesByStore().map(revenue => ({
                      title: revenue.store,
                      value: revenue.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each store
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <PieChart
                  className='px-4 pt-8'
                  labelStyle={defaultLabelStyle}
                  label={({ dataEntry }) => `${dataEntry.title}`}
                    data={getYearlyRevenuesByStore().map(revenue => ({
                      title: revenue.store,
                      value: revenue.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each store
                    }))}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Analytics;