import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { LOGIN } from '../utils/mutations'
import Auth from '../utils/auth'

function Login ()  {
  const [formState, setFormState] = useState({ email: '', password: ''})
  const [login, { error }] = useMutation(LOGIN)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login ({
        variables: { email: formState.email, password: formState.password },
      })
      const token = mutationResponse.data.login.token;
      Auth.login(token)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    })
  }
  return (
    <div className='container my-1 '>
      <Link to='/signup' className='text-blue-950 ml-2 font-semibold '>Go to Signup </Link>
      <h2 className='text-blue-900 font-bold uppercase text-center mb-12 mt-24 text-2xl'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-cols-2 justify-center my-2 mx-12">
          <label htmlFor='email' className=' w-20'>Email</label>
          <input
          placeholder='email@email.com'
          name='email'
          type='email'
          id ='email'
          onChange={handleChange}
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
          onChange={handleChange}
          className='rounded-lg mx-2 text-center border border-gray-950 w-48'
          />
        </div>
        {error ? (
          <div>
            <p className='error-text'>The provided credentials are incorrect</p>
          </div>
        ) : null }
        <div className='grid justify-items-center pt-12'>
          <button type='submit' className='rounded-lg bg-blue-900 text-white  px-2 py-1 w-36 shadow-xl'>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default Login