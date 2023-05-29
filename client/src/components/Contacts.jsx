import { useEffect } from 'react'
import ContactDetails from './ContactDetails'
import ContactForm from './ContactsForm'
import { usePhonebookContext } from '../hooks/usePhonebookContext'
import { useAuthContext } from '../hooks/useAuth'
//need to have contactForm only show onClick
const Contacts = () => {
  const { phonebooks, dispatch } = usePhonebookContext()
  const { user } = useAuthContext()
  //need to fire on add number as well, maybe state is better
  useEffect(() => {
    console.log('effect')
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      console.log('json', json)
      console.log('response', response)
      if (response.ok) {
        dispatch({type: 'SET_PHONEBOOKS', payload: json})
      }
    }
    if (user)
    {fetchContacts()}
  }, [dispatch, user])
//Auth is happening in ContactsForm
  return(
    <>
    <div>
    <ContactForm />
    </div>
    <div className='mapping'>
      {phonebooks && phonebooks.map(phonebook => (
        <ContactDetails key={phonebook._id} phonebook={phonebook} />
      ))}
    </div>
    </>
    
  )
}
export default Contacts
