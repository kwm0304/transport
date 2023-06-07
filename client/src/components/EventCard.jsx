import { FaDirections, FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { FaTrash } from 'react-icons/fa'
import { useAuthContext } from '../hooks/useAuth'
import { useEventContext } from '../hooks/useEventContext'
import { useEffect, useState } from 'react'

function EventCard ({ isOpen, onClose, props }) {
  const { store, address, startTime, endTime, firstName, lastName, price, phoneNumber, id } = props
  const cleanStartTime = (startTime.toLocaleString()).split(' ')
  const cleanEndTime = (endTime.toLocaleString()).split(' ')
  const { user } = useAuthContext()
  const { dispatch1 } = useEventContext()
  const [apiKey, setApiKey] = useState('')


  console.log('address', props.address)
  
  const handleDeleteEvent = async () => {
    if (!user) {return}
    const response = await fetch('/api/events/'+ props.id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch1({ type: 'DELETE_EVENT', payload: json })
    }
  }

  useEffect(() => {
    fetch('/api/google-maps-key')
      .then((res) => res.json())
      .then((data) => setApiKey(data.apiKey))
      .catch(error => console.error(error))
  }, [])
  // const getDirections = () => {
  //   if (!user) return
  //   fetch('/api/events/key', {
  //     headers: {
  //       'Authorization': `Bearer ${user.token}`
  //   }})
  //   .then(response => response.json())
  //   .then(data => {
  //     const apiKey = data.apiKey
  //     console.log(apiKey)
  //   })
  // }
  const genGoogleMap = (address) => {
    const formattedAddress = props.address.replace(/\s/g, '+')
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${formattedAddress}`
  }
  
  const currentCoordinates = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('latitude', latitude, 'longitude', longitude)
        },
        error => {
          console.error("Error getting location", error.message)
        }
      )
    } else {
      console.log("Geolocation isn't available at this time.")
    }
  }
  console.log(currentCoordinates)

return(
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <div className="grid justify-items-end text-blue-900 font-bold text-xl">
    <AiOutlineClose onClick={onClose} className='text-xl'/>
    </div>
    <button onClick={handleDeleteEvent}>
    <FaTrash className='text-blue-900 text-xl'/>
    </button>
    <h2 className="text-center mt-12  font-bold text-2xl text-blue-900">{store}</h2>
    <div className="flex justify-between mx-12 mt-8 text-blue-900 font-semibold text-xl">
      <div className="flex flex-col gap-2">
        <h3 className='font-bold'>From</h3>
        <p className="text-blue-900">{store}</p>
      </div>
      <div className="flex flex-col text-center gap-2">
        <h3 className='font-bold'>To</h3>
        <p className="text-blue-900">{address}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 py-4">
    <div className="flex flex-col items-center text-blue-900 py-8 px-12">
      <a href={genGoogleMap} target='_blank' rel='noopener noreferrer'><FaDirections className='text-5xl mb-4'/></a>
      <p>Directions</p>
    </div>
    <div className="flex flex-col items-center text-center text-blue-900 py-8 px-12">
      <FaPhoneAlt className='text-5xl mb-4'/>
      <p>{store}</p>
    </div>
    <div className="flex flex-col items-center text-center text-blue-900 py-8 px-12">
      <a href={'tel:'+{phoneNumber}}><FaPhoneAlt className='text-5xl mb-4'/></a>
      <p>{firstName} {lastName}</p>
    </div>
    </div>
    <div className='flex justify-between gap-8 mx-12  text-blue-900 font-semibold text-xl text-center'>
      <div className="flex flex-col gap-2">
        <p className='font-bold'>Start</p>
        <p className='text-blue-900'>{cleanStartTime[1]}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold'>End</p>
        <p className='text-blue-900'>{cleanEndTime[1]}</p>
      </div>
    </div>
    <p className='text-center py-8 font-bold text-2xl text-blue-900'>${price}</p>
  </Modal>
)
}

EventCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  props: PropTypes.shape({
    store: PropTypes.string,
    address: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string, 
    phoneNumber: PropTypes.number
  }).isRequired,
  
};

export default EventCard