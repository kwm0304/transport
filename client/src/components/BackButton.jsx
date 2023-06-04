import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'


const BackButton = () => {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
return(
<button onClick={goBack}>
  <FaArrowLeft />
</button>
)
}

export default BackButton