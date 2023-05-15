import { useAuthContext } from './useAuth'
import { useEventContext } from './useEventContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: eventsDispatch } = useEventContext()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    eventsDispatch({type: 'SET_EVENTS', payload: null})
  }
  return { logout }
}