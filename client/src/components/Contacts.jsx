import React, { useState, useEffect } from 'react';
import { FaAddressCard, FaPlus, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const Contacts = () => {
  const [storePhonebook, setStorePhonebook] = useState([]);
  const [customerPhonebook, setCustomerPhonebook] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const tabs = [
    {
      label: 'Stores',
      phonebook: storePhonebook,
      setPhonebook: setStorePhonebook,
      name: storeName,
      setName: setStoreName,
      number: storeNumber,
      setNumber: setStoreNumber,
      showForm: showStoreForm,
      setShowForm: setShowStoreForm
    },
    {
      label: 'Customers',
      phonebook: customerPhonebook,
      setPhonebook: setCustomerPhonebook,
      name: customerName,
      setName: setCustomerName,
      number: customerNumber,
      setNumber: setCustomerNumber,
      showForm: showCustomerForm,
      setShowForm: setShowCustomerForm
    }
  ];

  useEffect(() => {
    fetchPhonebooks();
  }, []);

  const fetchPhonebooks = async () => {
    try {
      const response = await fetch('/api/phonebooks');
      const data = await response.json();
      setStorePhonebook(data.storePhonebook);
      setCustomerPhonebook(data.customerPhonebook);
    } catch (error) {
      console.error('Error fetching phonebooks:', error);
    }
  };

  const addEntry = async (e, phonebook, setPhonebook, name, number, setName, setNumber, setShowForm) => {
    e.preventDefault();
    const newEntry = { name, number };

    try {
      const response = await fetch('/api/phonebooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      const addedEntry = await response.json();
      setPhonebook([...phonebook, addedEntry]);
      setName('');
      setNumber('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding phonebook entry:', error);
    }
  };

  const deleteEntry = async (id, phonebook, setPhonebook) => {
    try {
      await fetch(`/api/phonebooks/${id}`, {
        method: 'DELETE',
      });

      setPhonebook(phonebook.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error('Error deleting phonebook entry:', error);
    }
  };

  const updateEntry = async (id, updatedEntry, phonebook, setPhonebook) => {
    try {
      const response = await fetch(`/api/phonebooks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      const updatedEntryData = await response.json();
      setPhonebook((prevPhonebook) =>
        prevPhonebook.map((entry) => (entry._id === id ? updatedEntryData : entry))
      );
    } catch (error) {
      console.error('Error updating phonebook entry:', error);
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
    const phonebook = tabs[activeTab].phonebook;
    const updatedPhonebook = [...phonebook];
    updatedPhonebook[index].name = value;
    tabs[activeTab].setPhonebook(updatedPhonebook);
  };

  const handleEntryNumberChange = (index, value) => {
    const phonebook = tabs[activeTab].phonebook;
    const updatedPhonebook = [...phonebook];
    updatedPhonebook[index].number = value;
    tabs[activeTab].setPhonebook(updatedPhonebook);
  };

  const handleEditEntry = (index) => {
    setEditIndex(index);
  };

  const handleSaveEntry = (id, updatedEntry) => {
    updateEntry(id, updatedEntry, tabs[activeTab].phonebook, tabs[activeTab].setPhonebook);
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  return (
    <>
      <h2 className='text-center text-blue-900 font-bold text-2xl pt-8'>Contacts</h2>
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
      <FaPlus className='text-blue-900 mr-2 rounded-lg mt-8 ml-4' onClick={() => changeShow(activeTab)} />
      <div className='mt-4'>
        {tabs[activeTab].phonebook.map((entry, index) => (
          <div key={entry._id} className='flex items-center justify-center mt-2'>
            {editIndex === index ? (
              <>
                <input
                  type='text'
                  value={entry.name}
                  onChange={(e) => handleEntryNameChange(index, e.target.value)}
                  className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-32'
                />
                <input
                  type='number'
                  value={entry.number}
                  onChange={(e) => handleEntryNumberChange(index, e.target.value)}
                  className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center'
                />
                <button type='button' onClick={() => handleSaveEntry(entry._id, entry)}>
                  <FaCheck className='text-green-500 text-2xl ml-2' />
                </button>
                <button type='button' onClick={handleCancelEdit}>
                  <FaTimes className='text-red-500 text-2xl ml-2' />
                </button>
              </>
            ) : (
              <>
                <p className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-32'>{entry.name}</p>
                <p className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center'>{entry.number}</p>
                <button type='button' onClick={() => handleEditEntry(index)}>
                  <FaEdit className='text-blue-900 text-2xl ml-2' />
                </button>
              </>
            )}
            <button type='button' onClick={() => deleteEntry(entry._id, tabs[activeTab].phonebook, tabs[activeTab].setPhonebook)}>
              <FaTimes className='text-red-500 text-2xl ml-2' />
            </button>
          </div>
        ))}
        <form
          onSubmit={(e) =>
            addEntry(
              e,
              tabs[activeTab].phonebook,
              tabs[activeTab].setPhonebook,
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
                  type='text'
                  placeholder='Name'
                  value={tabs[activeTab].name}
                  onChange={(e) => tabs[activeTab].setName(e.target.value)}
                  className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-32'
                />
                <input
                  type='number'
                  placeholder='7044670444'
                  value={tabs[activeTab].number}
                  onChange={(e) => tabs[activeTab].setNumber(e.target.value)}
                  className='rounded-lg border-2 border-solid border-gray-200 mx-2 w-24 text-center'
                />
                <button type='submit'>
                  <FaAddressCard className='text-blue-900 text-2xl ml-2' />
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
