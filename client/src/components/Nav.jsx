import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

const Nav = () => {
  if (Auth.loggedIn()) {
  return (
    <nav className="sticky top-0 bg-blue-900">
      <div className="flex justify-between items-center p-4">
        <Link to="/dashboard" className="text-white">
          <p className='font-bold text-2xl'>MT</p>
        </Link>
        <ul className="flex list-none m-0 p-0">
          <li className="mr-4">
            <Link to="/navigation" className="text-white">Navigation</Link>
          </li>
          <li className="mr-4">
            <Link to="/calendar" className="text-white">Calendar</Link>
          </li>
          <li className="mr-4 text-white">
            <a href='/' onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
} else {
  return(
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
  )
}
}

export default Nav;
