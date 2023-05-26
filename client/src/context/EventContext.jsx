import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const EventContext = createContext()

export const eventReducer = (state = { events: [] }, action) => {
  const newEvents = Array.isArray(action.payload) ? action.payload : [action.payload]

  console.log('STATE', state)
  switch(action.type) {
    case 'SET_EVENTS': 
      return {
        ...state,
        events: action.payload
      }
    case 'CREATE_EVENT':
      return {
        ...state,
        events: [...state.events, ...newEvents]
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((e) => e._id !== action.payload._id)
      }
      default:
        return state
  }
}

export const EventContextProvider = ({ children }) => {
  const [events, dispatch] = useReducer(eventReducer, [])
  return(
    <EventContext.Provider value={{events, dispatch}}>
      { children }
    </EventContext.Provider>
  )
}

EventContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}