import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuth'

const MilageForm = () => {
  const [miles, setMiles] = useState(0)
  const [city, setCity] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  const handleShowForm = (e) => {
    e.preventDefault()
    setShowForm(!showForm)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mileage = { miles, city }
    try {
      const response = await axios.post('/api/odometers', mileage, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })
      if (response.status === 200) {
        setMiles(0)
        setCity('')
        setError(null)
        setShowForm(false)
      }
    } catch (error) {
      setError(error.response.data.error)
    }
  }
return (
  <>
    <h2 className='pt-8 text-blue-900 text-center pb-6 text-2xl font-semibold'>Mileage</h2>
    <div className='flex justify-center'>
    <button className='bg-blue-900 text-white w-24 rounded-lg px-2 py-1' onClick={handleShowForm}>+Trip</button>
    </div>
    {showForm && (
      <form className='pt-8' onSubmit={handleSubmit}>
        <div className="flex flex-cols-2 justify-between my-2 mx-4">
          <label className="font-semibold">Mileage</label>
          <input type='number' value={miles}  onChange={(e) => setMiles(e.target.value)} className="ml-4 border-2 border-solid border-gray-300 rounded-lg text-center"/>
        </div>
        <div className="flex flex-cols-2 justify-between my-2 mx-4">
          <label className="font-semibold">City</label>
          <input type='text' placeholder='Charlotte' value={city} onChange={(e) => setCity(e.target.value)} className="text-center rounded-lg ml-4 border-2 border-solid border-gray-300"/>
        </div>
        <div className="flex justify-center">
        <button className='bg-blue-900 px-2 py-1 w-24 rounded-lg text-white'>Submit</button>
        </div>
        {error && <div className='error'>{error}</div>}
      </form>
    )}
  </>
)
}
 export default MilageForm