import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const PhonebookContext = createContext()

export const phonebookReducer = (state = { phonebooks: [] }, action) => {
  const newPhonebooks = Array.isArray(action.payload) ? action.payload : [action.payload]
  switch (action.type) {
    case 'SET_PHONEBOOK': 
    return {
      ...state,
      phonebooks: action.payload
    }
    case 'CREATE_PHONEBOOK' : 
    return {
      ...state,
      phonebooks: [...state.phonebooks, ...newPhonebooks]
    }
    case 'DELETE_PHONEBOOK':
    return {
      ...state,
      phonebooks: state.phonebooks.filter((e) => e._id !== action.payload._id),
    };
      default:
        return state
  }
}

export const PhonebookContextProvider = ({ children }) => {
  const [phonebooks, dispatch] = useReducer(phonebookReducer, {phonebooks:[]})
  return (
    <PhonebookContext.Provider value={{phonebooks, dispatch}}>
      { children }
    </PhonebookContext.Provider>
  )
}

PhonebookContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}