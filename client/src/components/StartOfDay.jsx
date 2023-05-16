//Beginning miles, select which event we will do
import { useState } from 'react'

const StartOfDay = () => {
  const [mileage, setMileage] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault()
  }
return(
  <div>
  <h2 className="font-bold text-3xl text-center mt-12 text-blue-900">Start Of Day</h2>
  <form onSubmit={handleSubmit} className="text-blue-900">
    <div className="grid grid-cols-2 justify-items-center mt-8">
      <label htmlFor='mileage' className='font-semibold'>Mileage</label>
      <input 
      type='mileage' 
      name='mileage' 
      id='mileage' 
      value={mileage} 
      onChange={(e) => setMileage(e.target.value)} 
      className='border-2 border-blue-900 rounded-lg text-center'
      />
      {/*Radio list of day's events -> select one ->trigger directions to store */}
    </div>
  </form>
  </div>
)
}
export default StartOfDay