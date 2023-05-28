import { usePhonebookContext } from "../hooks/usePhonebookContext";
import { useAuthContext } from "../hooks/useAuth";
import { FaRegTrashAlt } from "react-icons/fa";

const ContactDetails = ({ phonebook }) => {
  const { dispatch } = usePhonebookContext()
  const { user } = useAuthContext()
  const handleClick = async () => {
    if (!user) {return}
    const response = await fetch('/api/contacts/' + phonebook._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'DELETE_PHONEBOOK', payload: json})
    }
  }

  return(
    <div className="phonebook-details flex justify-center items-center py-2">
      <a href={'tel'+`${phonebook.newNumber}`}><h4>{phonebook.newName}</h4></a>
      <FaRegTrashAlt className="text-blue-900" onClick={handleClick}/>
    </div>
  )
}

export default ContactDetails