// '*' route...maybe just redirect home w/ toast/Notification that something failed
import { AiFillHome } from 'react-icons/ai'
import {Link } from 'react-router-dom'
const NoMatch = () => {
  return (
    <div className="text-blue-900 text-3xl text-center mt-24 ">
      <p>Something went wrong</p>
      <div className="flex justify-center pt-8 text-5xl">
        <Link to='/'>
        <AiFillHome />
        </Link>
      </div>
    </div>
  )
}
export default NoMatch