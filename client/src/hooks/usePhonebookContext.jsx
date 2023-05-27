import { PhonebookContext } from "../context/PhonebookContext";
import { useContext } from 'react'

export const usePhonebookContext = () => {
  const context = useContext(PhonebookContext)
  if(!context) {
    throw Error('usePhonebookContext must be inside PhonebookContextProvider')
  }
  return context
}