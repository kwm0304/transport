import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const EventContext = createContext()

export const eventReducer = (state, action) => {
  switch(action.type) {
    case 'SET_EVENTS': 
      return {
        events: action.payload
      }
    case 'CREATE_EVENT':
      return {
        events: [action.payload, state.events]
      }
    case 'DELETE_EVENT':
      return {
        events: state.events.filter((e) => e._id !== action.payload._id)
      }
      default:
        return state
  }
}

export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    events: null
  })
  return(
    <EventContext.Provider value={{...state, dispatch}}>
      { children }
    </EventContext.Provider>
  )
}

EventContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}