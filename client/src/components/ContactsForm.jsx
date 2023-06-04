import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { usePhonebookContext } from '../hooks/usePhonebookContext'
import { FaPlus, FaUserAlt, FaPhoneAlt } from 'react-icons/fa'

const ContactForm = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { phonebooks, dispatch } = usePhonebookContext()
  const { user } = useAuthContext()

  
  const handleAddContact = async (e) => {
    e.preventDefault()
    if (!user) {
      setErrorMessage('You must be logged in')
      return
    }
    const phonebook = {newName, newNumber}
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(phonebook),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
      
    })
    console.log('response', response)
    const json = await response.json()
    console.log('json', json)
    if (!response.ok) {
      setErrorMessage(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setNewName('')
      setNewNumber('')
      setErrorMessage(null)
      setEmptyFields([])
      setShowForm(false)
      console.log('New contact added', json)
      dispatch({type: 'CREATE_PHONEBOOK', payload: json})
      console.log('dispatch', dispatch)
    }
  }
  console.log('Empty Fields', emptyFields)
  console.log('PB', {phonebooks})
  const handleFormShow = () => {
    setShowForm(!showForm)
  }
  

  return (
    <>
      <h2 className='text-center font-bold text-2xl text-blue-900 my-8'>Contacts</h2>
      <div className="flex justify-end mr-8 text-blue-900 text-2xl">
      <FaPlus onClick={handleFormShow}/>
      </div>
      {showForm && (
      <form className='text-blue-900' onSubmit={handleAddContact}>
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
      )}
    </>
  )
}

export default ContactForm