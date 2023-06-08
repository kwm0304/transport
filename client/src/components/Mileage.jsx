import MileageDisplay from "./MileageDisplay"
import MileageForm from "./MileageForm"
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import axios from 'axios'

const Mileage = () => {
  const [trips, setTrips] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/api/odometers', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
      },
    })
    setTrips(response.data)
  } catch (error) {
    console.log(error)
  }
}
if (user) {
  fetchTrips()
}
}, [user])

  return (
    <>
    <MileageForm />
    {trips.map((trip) => (
      <MileageDisplay
      key={trip._id}
      miles={trip.miles}
      city={trip.city}
      _id={trip._id}
      createdAt={trip.createdAt}
      />
    ))}
    </>
  )
}
export default Mileage