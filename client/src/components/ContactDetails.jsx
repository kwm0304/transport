import { usePhonebookContext } from "../hooks/usePhonebookContext";
import { useAuthContext } from "../hooks/useAuth";
import { FaRegTrashAlt } from "react-icons/fa";
import PropTypes from 'prop-types'

const ContactDetails = ({ phonebook }) => {
  const {  dispatch } = usePhonebookContext()
  const { user } = useAuthContext()
  //returning 404 not found, but array did shrink from 25 to 21
  const handleClick = async (e) => {
    console.log("handle trhe dclcik")
    e.preventDefault()
    if (!user) {return}
    const response = await fetch('/api/contacts/delete/' + phonebook._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log('delete response', response)
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_PHONEBOOK', payload: json})
    }
  }
  return(
    <>
    <div className="phonebook-details flex justify-between items-center py-2 gap-2 mx-4">
      <a href={'tel:'+`${phonebook.newNumber}`}><h4 className="capitalize">{phonebook.newName}</h4></a>
      <button onClick={handleClick}><FaRegTrashAlt className="text-blue-900" /></button>
    </div>
    </>
  )
}

ContactDetails.propTypes = {
  phonebook: PropTypes.node.isRequired
}

export default ContactDetails