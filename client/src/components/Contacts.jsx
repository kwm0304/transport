import { useState, useContext } from 'react';
import { FaAddressCard, FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuth';
import { PhonebookContext } from '../context/PhonebookContext'
const Contacts = () => {
  const { phonebooks=[], dispatch } = useContext(PhonebookContext);
  const { user } = useAuthContext();
  const [storeName, setStoreName] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [error, setError] = useState(null);

  console.log('phonebooks', phonebooks);
  if (!user) {
    return <div>Loading...</div>
  }
  console.log('pb type', typeof phonebooks)
  const tabs = [
    {
      label: 'Stores',
      phonebookType: 'store',
      name: storeName,
      setName: setStoreName,
      number: storeNumber,
      setNumber: setStoreNumber,
      showForm: showStoreForm,
      setShowForm: setShowStoreForm,
    },
    {
      label: 'Customers',
      phonebookType: 'customer',
      name: customerName,
      setName: setCustomerName,
      number: customerNumber,
      setNumber: setCustomerNumber,
      showForm: showCustomerForm,
      setShowForm: setShowCustomerForm,
    },
  ];

  const handleAddEntry = async (e, phonebookType, name, number, setName, setNumber, setShowForm) => {
    e.preventDefault();
    const newEntry = { name, number };
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(newEntry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const newerEntry = await response.json();
    console.log('newerEntry', newerEntry);
    if (!response.ok) {
      setError(newerEntry.error);
    }
    if (response.ok && user) {
      
      dispatch({ type: 'CREATE_PHONEBOOK', payload: { phonebookType, entry: newerEntry } });
      setName('');
      setNumber('');
      setShowForm(false);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const changeShow = (index) => {
    if (index === 0) {
      setShowStoreForm(!showStoreForm);
    } else if (index === 1) {
      setShowCustomerForm(!showCustomerForm);
    }
  };

  const handleEntryNameChange = (index, value) => {
    const updatedPhonebooks = [...phonebooks];
    updatedPhonebooks[index].name = value;
    dispatch({ type: 'SET_PHONEBOOK', payload: updatedPhonebooks });
  };

  const handleEntryNumberChange = (index, value) => {
    const updatedPhonebooks = [...phonebooks];
    updatedPhonebooks[index].number = value;
    dispatch({ type: 'SET_PHONEBOOK', payload: updatedPhonebooks });
  };

  const handleEditEntry = (index) => {
    setEditIndex(index);
  };

  const handleSaveEntry = () => {
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  return (
    <>
      <h2 className="text-center text-blue-900 font-bold text-2xl pt-8">Contacts</h2>
      <div className="flex rounded-lg pt-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${index === activeTab ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <FaPlus className="text-blue-900 mr-2 rounded-lg mt-8 ml-4" onClick={() => changeShow(activeTab)} />
      <div className="mt-4">
        {Object.keys(phonebooks).map((phonebook, index) => (
          <div key={phonebook.id} className="flex items-center justify-center mt-2">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={phonebook.name}
                  onChange={(e) => handleEntryNameChange(index, e.target.value)}
                  className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-32"
                />
                <input
                  type="number"
                  value={phonebook.number}
                  onChange={(e) => handleEntryNumberChange(index, e.target.value)}
                  className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center"
                />
                <button type="button" onClick={handleSaveEntry}>
                  <FaCheck className="text-green-500 text-2xl ml-2" />
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  <FaTimes className="text-red-500 text-2xl ml-2" />
                </button>
              </>
            ) : (
              <>
                <p className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-32">{phonebook.name}</p>
                <p className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center">{phonebook.number}</p>
                <button type="button" onClick={() => handleEditEntry(index)}>
                  <FaEdit className="text-blue-900 text-2xl ml-2" />
                </button>
              </>
            )}
          </div>
        ))}
        <form
          onSubmit={(e) =>
            handleAddEntry(
              e,
              tabs[activeTab].phonebookType,
              tabs[activeTab].name,
              tabs[activeTab].number,
              tabs[activeTab].setName,
              tabs[activeTab].setNumber,
              tabs[activeTab].setShowForm
            )
          }
        >
          <div className="flex items-center justify-center mt-4">
            {tabs[activeTab].showForm && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={tabs[activeTab].name}
                  onChange={(e) => tabs[activeTab].setName(e.target.value)}
                  className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-32"
                />
                <input
                  type="number"
                  placeholder="7044670444"
                  value={tabs[activeTab].number}
                  onChange={(e) => tabs[activeTab].setNumber(e.target.value)}
                  className="rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center"
                />
                <button type="submit">
                  <FaAddressCard className="text-blue-900 text-2xl ml-2" />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Contacts;