import { useState } from 'react'
import { useEventContext } from '../hooks/useEventContext'
import { useAuthContext } from '../hooks/useAuth'
import DateTime from 'react-datetime'
import Modal from 'react-modal'
import { GrClose } from 'react-icons/gr'

export default function EventModal({isOpen, onClose, onEventAdded}) {
  const { dispatch } = useEventContext()
  const { user } = useAuthContext()
    const [title,setTitle]=useState('')
    const [price,setPrice]=useState(0)
    const [start,setStart]=useState(new Date())
    const [end,setEnd]=useState(new Date())
    const [address,setAddress]=useState('')
    const [first,setFirst]=useState('')
    const [last,setLast]=useState('')
    const [error, setError]=useState(null)
    const [emptyField, setEmptyField] = useState([])

    const modalStyle = {
      content: {
        height: '90vh',
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user) {
      setError('You must be logged in')
      return
    }
    const event = {title, start, end, first, last, price, address}
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyField(json.emptyField)
    }
    if (response.ok) {
      setTitle('')
      setPrice(0)
      setStart(null)
      setEnd(null)
      setAddress('')
      setFirst('')
      setLast('')
      setError(null)
      setEmptyField([])
      console.log('New Event added', event)
      onEventAdded(event)
      dispatch({type: 'CREATE_EVENT', payload: json})
    }
    onClose()
  }

  return(
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div className='flex justify-end text-xl text-blue-900' onClick={onClose}>
      <GrClose />
      </div>
      <div className="container my-1">
        <h2 className='text-blue-900 font-bold uppercase text-center mb-12 mt-8 text-2xl'>Add Event</h2>
      <form onSubmit={handleSubmit} id='event-form' className='create'>
        <div className="flex flex-cols-2 justify-center my-2 mx-2">
          <label htmlFor="title" className="w-20">Store</label>
          <input
          placeholder="Details"
          name='title'
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2">
          <label htmlFor="price" className="w-20">Price</label>
          <input
          placeholder="100"
          name='price'
          type="number"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2">
          <label htmlFor="address" className="w-20">Address</label>
          <input
          placeholder="1234 5th St."
          name='address'
          type="address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2">
          <label htmlFor="firstName" className="w-20">First Name</label>
          <input
          placeholder="Jane"
          name='firstName'
          type="firstName"
          id="firstName"
          onChange={(e) => setFirst(e.target.value)}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2 ">
          <label htmlFor="lastName" className="w-20">Last Name</label>
          <input
          placeholder="Doe"
          name='lastName'
          type="lastName"
          id="lastName"
          onChange={(e) => setLast(e.target.value)}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2 ">
        <label htmlFor="store" className='w-20'>Start</label>
        <div className="text-center">
        <DateTime value={start} onChange={(date) => setStart(date)} className='rounded-lg mx-2 text-center border border-gray-950 w-48'/>
        </div>
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-2 ">
        <label htmlFor="end" className='w-20'>End</label>
        <div className="text-center ">
        <DateTime value={end} onChange={(date) => setEnd(date)} className='rounded-lg mx-2 text-center border border-gray-950 w-48'/>
        </div>
        </div>
        <div className='grid justify-items-center pt-'>
          <button type='submit' className='rounded-lg bg-blue-900 text-white px-2 py-1 w-36 shadow-xl'>Submit</button>
        </div>
      </form>
      </div>
     </Modal>
  )

}