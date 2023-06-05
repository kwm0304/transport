import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuth';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useEventContext } from '../hooks/useEventContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PieChart } from 'react-minimal-pie-chart';

const Analytics = () => {
  const { user } = useAuthContext();
  const { expenses, dispatch } = useExpenseContext();
  const { events, dispatch1 } = useEventContext();

  useEffect(() => {
    const fetchExpensesAndRevenues = async () => {
      try {
        const expenseResponse = await fetch('/api/expenses', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const expenseData = await expenseResponse.json();
        dispatch({ type: 'SET_EXPENSES', payload: expenseData });

        const eventResponse = await fetch('/api/events', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const eventData = await eventResponse.json();
        dispatch1({ type: 'SET_EVENTS', payload: eventData });
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    if (user) {
      fetchExpensesAndRevenues();
    }
  }, [dispatch, dispatch1, user]);

  //filter expense/rev for given time period -> return array of objects for that time period
  const getWeeklyExpenses = () => {
    
  };

  const getMonthlyExpenses = () => {
    
  };

  const getYearlyExpenses = () => {
    
  };

  const getWeeklyRevenuesByStore = () => {
    
  };

  const getMonthlyRevenuesByStore = () => {
    
  };

  const getYearlyRevenuesByStore = () => {
    
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
                  {/* Render the pie chart for weekly expenses */}
                  <PieChart
                    data={getWeeklyExpenses().map((expense) => ({
                      title: expense.type,
                      value: expense.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each expense type
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {/* Render the pie chart for monthly expenses */}
                  <PieChart
                    data={getMonthlyExpenses().map((expense) => ({
                      title: expense.type,
                      value: expense.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each expense type
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {/* Render the pie chart for yearly expenses */}
                  <PieChart
                    data={getYearlyExpenses().map((expense) => ({
                      title: expense.type,
                      value: expense.amount,
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
                  {/* Render the pie chart for weekly revenues by store */}
                  <PieChart
                    data={getWeeklyRevenuesByStore().map((revenue) => ({
                      title: revenue.store,
                      value: revenue.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each store
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {/* Render the pie chart for monthly revenues by store */}
                  <PieChart
                    data={getMonthlyRevenuesByStore().map((revenue) => ({
                      title: revenue.store,
                      value: revenue.amount,
                      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color for each store
                    }))}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {/* Render the pie chart for yearly revenues by store */}
                  <PieChart
                    data={getYearlyRevenuesByStore().map((revenue) => ({
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
