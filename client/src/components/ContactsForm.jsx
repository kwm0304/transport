import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { usePhonebookContext } from '../hooks/usePhonebookContext'
import { FaPlus, FaUserAlt, FaPhoneAlt } from 'react-icons/fa'

const ContactsForm = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { phonebooks, dispatch } = usePhonebookContext()
  const { user } = useAuthContext()

  
  const handleAddContact = async (e) => {
    e.preventDefault()
    if (!user) {
      setErrorMessage('You must be logged in')
      return
    }
    const phonebook = {newName, newNumber}
    const response = await fetch('api/contacts', {
      method: 'POST',
      body: JSON.stringify(phonebook),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setErrorMessage(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setNewName('')
      setNewNumber('')
      setErrorMessage(null)
      setEmptyFields([])
      console.log('New contact added', json)
      dispatch({type: 'CREATE_PHONEBOOK', payload: json})
    }
  }
  console.log('Empty Fields', emptyFields)
  console.log('PB', {phonebooks})

  return (
    <>
    <form className='text-blue-900' onSubmit={handleAddContact}>
      <h2 className='text-center font-bold text-2xl'>Contacts</h2>
      <div className="flex justify-end mr-8 text-blue-900 text-2xl">
      <FaPlus />
      </div>
      <div className="flex items-center gap-2 mt-12 justify-center">
      <label><FaUserAlt /></label>
      <input 
        type='text'
        placeholder='First Last'
        value={newName}
        className='border-2 border-solid border-gray-300 rounded-lg w-32 text-center'
        onChange={(e) => setNewName(e.target.value)}
      />
      <label><FaPhoneAlt /></label>
      <input 
        type='number'
        placeholder='7044670444'
        value={newNumber}
        className='border-2 border-solid border-gray-300 rounded-lg w-32 text-center'
        onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      <div className="flex justify-center">
      <button className='bg-blue-900 text-white rounded-lg p-1 mt-2'>Create Contact</button>
      </div>
    </form>
    
    
    </>
  )
}

export default ContactsForm