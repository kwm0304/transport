import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

function Login ()  {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <div className='container my-1 '>
      <Link to='/signup' className='text-blue-950 ml-2 font-semibold '>Go to Signup </Link>
      <h2 className='text-blue-900 font-bold uppercase text-center mb-12 mt-24 text-2xl'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor='email' className=' w-20'>Email</label>
          <input
          placeholder='email@email.com'
          name='email'
          type='email'
          id ='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded-lg mx-2 text-center border border-gray-950 w-48'
          />
        </div>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor='pwd' className=' w-20'>Password</label>
          <input
          placeholder='*****'
          name='password'
          type='password'
          id='pwd'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='rounded-lg mx-2 text-center border border-gray-950 w-48'
          />
        </div>
        {error ? (
          <div>
            <p className='error-text'>{error}</p>
          </div>
        ) : null }
        <div className='grid justify-items-center pt-12'>
          <button type='submit' disabled={isLoading} className='rounded-lg bg-blue-900 text-white  px-2 py-1 w-36 shadow-xl'>Login</button>
        </div>
      </form>
    </div>
  )
}
export default Login