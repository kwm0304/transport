import { FaDirections, FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Modal from 'react-modal'

export default function EventCard ({ isOpen, onClose, props }) {
  const { store, address, startTime, endTime, firstName, lastName, price } = props
  const cleanStartTime = (startTime.toLocaleString()).split(' ')
  const cleanEndTime = (endTime.toLocaleString()).split(' ')
return(
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <div className="grid justify-items-end text-blue-900 font-bold text-xl">
    <AiOutlineClose onClick={onClose}/>
    </div>
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
      <FaDirections className='text-5xl mb-4'/>
      <p>Directions</p>
    </div>
    <div className="flex flex-col items-center text-center text-blue-900 py-8 px-12">
      <FaPhoneAlt className='text-5xl mb-4'/>
      <p>{store}</p>
    </div>
    <div className="flex flex-col items-center text-center text-blue-900 py-8 px-12">
      <FaPhoneAlt className='text-5xl mb-4'/>
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