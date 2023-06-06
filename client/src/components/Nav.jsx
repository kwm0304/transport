import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuth';

const Nav = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {logout()}
  
  return (
    <>
    {user && (
    <nav className="sticky top-0 bg-blue-900">
      <div className="flex justify-between items-center p-4">
        <Link to="/" className="text-white">
          <p className='font-bold text-2xl'>MT</p>
        </Link>
        
        <ul className="flex list-none m-0 p-0">
          <li className="mr-4">
            <Link to="/calendar" className="text-white">Calendar</Link>
          </li>
          <li className="mr-4 text-white">
            <a href='/' onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
         
      </div>
    </nav>
    )}{!user && (
    <nav className="sticky top-0 bg-blue-900">
      <div className='flex justify-between items-center p-4'>
      <Link to="/dashboard" className="text-white">
        <p className='font-bold text-2xl'>MT</p>
      </Link>
    <ul className="flex text-white list-none m-0 p-0">
      <li className="mx-1">
        <Link to="/signup">
          Signup
        </Link>
      </li>
      <li className="mx-1">
        <Link to="/login">
          Login
        </Link>
      </li>
    </ul>
    </div>
    </nav>
    )}
    </>
  )
}


export default Nav;
