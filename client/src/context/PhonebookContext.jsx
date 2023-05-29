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
      phonebooks: [action.payload, ...state.phonebooks = []]
    }
    
  case 'DELETE_WORKOUTS' :
    return {
      phonebooks: state.phonebooks.filter((p) => p._id !== action.payload._id)
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