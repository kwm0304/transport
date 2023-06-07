import { useAuthContext } from "../hooks/useAuth"
import PropTypes from 'prop-types'
import { FaTrash } from "react-icons/fa"


const MileageDisplay = ({ miles, city, _id }) => {
  const { user } = useAuthContext()

  const handleClick = async (e) => {
    e.preventDefault()
    if (!user) return
  }
  
  return (
    <>
    <div className="flex gap-4 mx-4 justify-between mt-4 border-2 border-blue-900 border-solid rounded-lg items-center text-blue-900 " key={_id}>
      <p className="ml-4">City{city}</p>
      <p>Miles{miles}</p>
      <p className="">date</p>
      <FaTrash className="mr-4"/>
    </div>
    </>
  )
}

MileageDisplay.propTypes = {
    miles: PropTypes.number,
    city: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
  }
export default MileageDisplay;
