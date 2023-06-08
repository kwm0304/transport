import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'


const BackButton = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
return(
<button onClick={goBack} className='bg-blue-900 px-2 py-1 rounded-lg m-2'>
  <FaArrowLeft className='text-white'/>
</button>
)
}

export default BackButton