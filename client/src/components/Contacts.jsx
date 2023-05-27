import { useState } from 'react'
import { FaAddressCard, FaPlus } from 'react-icons/fa'

const Contacts = () => {
  const [phonebook, setPhonebook] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = { name, number }
    setPhonebook([...phonebook, newEntry])
    setName('')
    setNumber('')
  }
  return (
    <>
    <h2 className='text-center text-blue-900 font-bold text-2xl pt-8'>Contacts</h2>
      <FaPlus className='text-4xl text-blue-900 border-2 border-solid border-blue-900 rounded-lg m-2'/>
    <form onSubmit={handleSubmit}>
    </form>
    </>
  )
}
export default Contacts