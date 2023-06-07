import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  console.log('email', email)
  console.log('password', password)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }
  return(
    <div className='container my-1'>
      <Link to='/login' className='text-blue-950  font-semibold ml-2'>Go to Login</Link>
      <h2 className='text-blue-900 font-bold uppercase text-center mb-12 mt-24 text-2xl'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor='firstName' className='w-20'>Email</label>
          <input
          placeholder='First'
          name='firstName'
          type='firstName'
          id='firstName'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='rounded-lg mx-2 text-center border border-gray-950 w-48'
          />
        </div>     
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor='pwd' className='w-20'>Password</label>
          <input
          placeholder='*****'
          name='password'
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='rounded-lg mx-2 text-center border border-gray-950 w-48'
          />
        </div>
        <div className='grid justify-items-center pt-12'>
          <button type='submit' disabled={isLoading} className='rounded-lg bg-blue-900 text-white  px-2 py-1 w-36 shadow-xl'>Submit</button>
          {error && <div className='error'>{error}</div>}
        </div>
      </form>
    </div>
  )
}
export default Signup