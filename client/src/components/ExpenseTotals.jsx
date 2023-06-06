import { useEffect } from 'react';
import moment from 'moment';
import { useExpenseContext } from '../hooks/useExpenseContext';
import { useAuthContext } from '../hooks/useAuth';

const ExpenseTotals = () => {
  const { expenses, dispatch } = useExpenseContext();
  const { user } = useAuthContext();

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

  const calculateWeekTotal = () => {
    const currentDate = moment();
    const currentWeek = currentDate.isoWeek();

    const weekExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.createdAt);
      return (
        expenseDate.isoWeek() === currentWeek &&
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

  const calculateMonthTotal = () => {
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

  const calculateYearTotal = () => {
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

  const calculateTodayTotal = () => {
    const currentDate = moment();
    const currentDay = currentDate.day()

    const todayExpenses = expenses.filter(expense => {
      const expenseDate = moment(expense.createdAt);
      return expenseDate.day() === currentDay
    });

    const types = [...new Set(todayExpenses.map(expense => expense.type))];
    const totals = types.map(type => ({
      type,
      total: calculateTotal(todayExpenses, type)
    }));

    return totals;
  };

  return (
    <div className='text-center text-blue-900'>
      <h2 className='font-bold text-xl'>Expenses</h2>
      <div>
        <h3 className='font-semibold text-lg'>Today:</h3>
        <ul>
          {calculateTodayTotal().map(total => (
            <li key={total.type}>
              <span className='font-semibold'>{total.type}:</span> <span className='text-red-500'>{total.total}</span>
            </li>
          ))}
        </ul>
        <h3 className='font-semibold text-lg'>Week:</h3>
        <ul>
          {calculateWeekTotal().map(total => (
            <li key={total.type}>
              <span className='font-semibold'>{total.type}:</span> <span className='text-red-500'>{total.total}</span>
            </li>
          ))}
        </ul>
        <h3 className='font-semibold text-lg'>Month:</h3>
        <ul>
          {calculateMonthTotal().map(total => (
            <li key={total.type}>
              <span className='font-semibold'>{total.type}:</span> <span className='text-red-500'>{total.total}</span>
            </li>
          ))}
        </ul>
        <h3 className='font-semibold text-lg'>Year:</h3>
        <ul>
          {calculateYearTotal().map(total => (
            <li key={total.type}>
              <span className='font-semibold'>{total.type}:</span> <span className='text-red-500'>{total.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTotals;
