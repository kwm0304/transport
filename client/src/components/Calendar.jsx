import { useState, useRef, useEffect, useContext } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
//components
import EventModal from './EventModal'
import EventCard from './EventCard'
//hooks/context
import { EventContext } from '../context/EventContext'
import { useAuthContext } from '../hooks/useAuth'


//TODO handle retrieval of events on login
const Calendar = () => {
  const { user } = useAuthContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  const calendarRef = useRef(null)
  const { events=[], dispatch1 } = useContext(EventContext)
  const [selectedEvent, setSelectedEvent] = useState(null)
  
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        const json = await response.json();
        dispatch1({ type: 'SET_EVENTS', payload: json });
      }
    };
    if (user) {
      fetchEvents();
    }
  }, [dispatch1, user]);

  const handleDateClick = () => {
    setModalOpen(true)
  }
  const handleEventClick = (info) => {
    console.log("CLICK")
      const store = info.event.title
      const price = info.event._def.extendedProps.price
      const address = info.event._def.extendedProps.address
      const firstName = info.event._def.extendedProps.first
      const lastName = info.event._def.extendedProps.last
      const startTime = info.event._instance.range.start
      const endTime = info.event._instance.range.end
      const phoneNumber = info.event._def.extendedProps.phoneNumber
      const id = info.event._def.extendedProps._id
      setSelectedEvent({
        store,
        price,
        address,
        firstName,
        lastName,
        startTime,
        endTime,
        phoneNumber,
        id
      })
    setModal2Open(true)
  }

  const handleEventAdded = async (event) => {
      let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent({
          id: event._id, 
          start: moment(event.start),
          end: moment(event.end),
          title: event.title,
          address: event.address,
          price: event.price,
          first: event.first,
          last: event.last,
          phoneNumber: event.phoneNumber
        });
        const updatedEvents = [...events, event]
        dispatch1({ type: 'SET_EVENTS', payload: [updatedEvents]})
      setModalOpen(false);
  };

  const handleAddEventClick = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedEvent(null)
  }
  const handleCloseModal2 = () => {
    setModal2Open(false)
  }
  const headerToolbarOptions = {
    left: 'title',
  }
  
  const footerToolbarOptions = {
    center: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
  }

  

  return (
    <section>
    <div className='text-blue-900 font-bold mx-1 mt-12' style={{ position: "relative", zIndex: 0}}>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView='dayGridDay'
      headerToolbar={headerToolbarOptions}
      footerToolbar={footerToolbarOptions}
      dateClick={handleDateClick}
      events={events}
      selectAllow={(info) => !info.allDay}
      eventAdd={(event) => handleEventAdded(event)}
      ref={calendarRef}
      eventClick={handleEventClick}
      editable
      selectable
      />
    </div>
    
    <div className="flex justify-center pt-4 mb-12">
      <button className='grid rounded-lg bg-blue-900 text-white p-2' onClick={handleAddEventClick}>Add Event</button>
    </div>
    <EventModal 
    className='opacity-100' 
    isOpen={modalOpen} 
    onClose={handleCloseModal} 
    onEventAdded={handleEventAdded}
    />
    {selectedEvent && (
    <EventCard
    isOpen={modal2Open}
    onClose={handleCloseModal2}
    props={selectedEvent} 
     />
    )}
    </section>
  
  )
}
export default Calendar