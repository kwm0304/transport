import { createContext, useReducer } from 'react';
export const ExpenseContext = createContext();
import PropTypes from 'prop-types'

export const expenseReducer = (state = { expenses: [] }, action) => {
  const newExpenses = Array.isArray(action.payload) ? action.payload : [action.payload]
  switch (action.type) {
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload
      };
    case 'CREATE_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, ...newExpenses]
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, [])

  return (
    <ExpenseContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ExpenseContext.Provider>
  );
};

ExpenseContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
