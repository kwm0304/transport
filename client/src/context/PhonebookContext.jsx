import { createContext, useReducer } from 'react'

export const PhonebookContext = createContext()
export const phonebookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PHONEBOOKS': 
    return { 
      phonebooks: action.payload
    }
  case 'CREATE_PHONEBOOK': 
    return {
      phonebooks: [action.payload, ...state.phonebooks = [...state.phonebooks]]
    }
    
  case 'DELETE_PHONEBOOK' :
    return {
      phonebooks: state.phonebooks.filter((phonebook) => phonebook._id !== action.payload._id)
    }
    default:
      return state
  }
}
export const PhonebookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phonebookReducer, {
    phonebooks: null
  })

  return (
    <PhonebookContext.Provider value={{...state, dispatch}}>
      { children }
    </PhonebookContext.Provider>
  )
}
//adding multiple contacts 
