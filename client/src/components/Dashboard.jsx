//Home screen
//Maybe just a series of icons for the rest of the applicable components
//Maybe don't need 
import { SiGoogleanalytics } from 'react-icons/si'
import { BsCalendarMonth } from 'react-icons/bs'
import { RiContactsFill, RiSettings3Fill } from 'react-icons/ri'
import { FaDollarSign } from 'react-icons/fa'
import { TiThList } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const Dashboard = () => {
return(
  <>
  <h2 className='text-blue-900 font-bold uppercase text-center mb-16 mt-16 text-2xl'>Dashboard</h2>
  <div className="grid grid-cols-2 text-blue-900 place-items-center gap-y-20">
    <div className='grid-grid-cols-1 '>
      <Link to='/analytics'>
      <SiGoogleanalytics className='text-4xl mx-auto'/>
      <h3 className='font-bold'>Analytics</h3>
      </Link>
    </div>
    <div className='grid-grid-cols-1 text-center'>
      <Link to='/calendar'>
      <BsCalendarMonth className='text-4xl mx-auto'/>
      <h3 className='font-bold'>Calendar</h3>
      </Link>
    </div>
    <div className='grid-grid-cols-1 text-center'>
      <Link to='/contacts'>
      <RiContactsFill className='text-4xl mx-auto'/>
      <h3 className='font-bold'>Contacts</h3>
      </Link>
    </div>
    <div className='grid-grid-cols-1 -center'>
      <Link to='/finances'>
      <FaDollarSign className='text-4xl mx-auto font-bold'/>
      <h3 className='font-bold'>Finances</h3>
      </Link>
    </div>
    
  </div>
  </>
)
}
export default Dashboard