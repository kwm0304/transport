import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const PhonebookContext = createContext()

export const phonebookReducer = (state = { phonebooks: [] }, action) => {
  switch (action.type) {
    case 'SET_PHONEBOOK': 
    return {
      ...state,
      phonebooks: action.payload
    }
    case 'CREATE_PHONEBOOK' : 
    return {
      ...state,
      phonebooks: {
        ...state.phonebooks,
        [action.phonebookType]: [...state.phonebooks[action.phonebookType], action.entry],
      }
    }
    case 'UPDATE_PHONEBOOK':
      return {
        ...state.phonebooks,
        [action.phonebookType]: action.payload, 
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
  const [phonebooks, dispatch] = useReducer(phonebookReducer, { phonebooks:[] })
  return (
    <PhonebookContext.Provider value={{phonebooks, dispatch}}>
      { children }
    </PhonebookContext.Provider>
  )
}

PhonebookContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}