import { EventContext } from '../context/EventContext'
import { useContext } from 'react'

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw Error('useEventContext must be inside EventContextProvider')
  }
  return context
}