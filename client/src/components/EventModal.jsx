import { useState } from 'react'
// import Modal from 'react-modal'

export default function EventModal() {
  const [formState, setFormState] = useState({ title: '', price: 0, customer_email: '', start: null, end: null, address: '', customer_first: '', customer_last: '' })
  // const modalStyle = {
  //   contenet: {
  //     height: '80vh'
  //   }
  // }

  const handleEventFormSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
    ...formState,
    [name]: value
  })
}

  return(
    // <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div className="container my-1">
        <h2 className='text-blue-900 font-bold uppercase text-center mb-12 mt-24 text-2xl'>Add Event</h2>
      <form onSubmit={handleEventFormSubmit} id='event-form'>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor="title" className="w-20">Store</label>
          <input
          placeholder="Details"
          name='title'
          type="title"
          id="title"
          onChange={handleChange}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor="price" className="w-20">Price</label>
          <input
          placeholder="100"
          name='price'
          type="number"
          id="price"
          onChange={handleChange}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor="address" className="w-20">Address</label>
          <input
          placeholder="1234 5th St."
          name='address'
          type="address"
          id="address"
          onChange={handleChange}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor="firstName" className="w-20">First Name</label>
          <input
          placeholder="Jane"
          name='firstName'
          type="firstName"
          id="firstName"
          onChange={handleChange}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-12 ">
          <label htmlFor="lastName" className="w-20">Last Name</label>
          <input
          placeholder="Doe"
          name='lastName'
          type="lastName"
          id="lastName"
          onChange={handleChange}
          className="rounded-lg mx-2 text-center border border-gray-950 w-48"
          />
        </div>
        <div className="flex justify-center  my-2 mx-12 ">
          <div className="grid grid-cols-2 text-start">
          <label htmlFor="store" className='ml-3'>Start</label>
            <input
            placeholder="1:00"
            name='start'
            type="start"
            id="start"
            onChange={handleChange}
            className="rounded-lg  text-center border border-gray-950 w-16"
            />
          </div>
          <div className="grid grid-cols-2 text-center">
          <label htmlFor="end">End</label>
            <input
            placeholder="2:00"
            name='end'
            type="end"
            id="end"
            onChange={handleChange}
            className="rounded-lg  text-center border border-gray-950 w-16"
            />
          </div>
        </div>
        <div className='grid justify-items-center pt-12'>
          <button type='submit' className='rounded-lg bg-blue-900 text-white  px-2 py-1 w-36 shadow-xl'>Submit</button>
        </div>
      </form>
      </div>
    // </Modal>
  )

}