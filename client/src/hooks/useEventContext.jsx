import { EventContext } from '../context/EventContex'
import { useContext } from 'react'

export const useWorkoutContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw Error('useEventContext must be inside EventContextProvider')
  }
  return context
}