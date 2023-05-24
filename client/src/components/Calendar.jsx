import { useState, useRef, useEffect, useContext } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from './EventModal'
import moment from 'moment'
import { EventContext } from '../context/EventContext'
import { useAuthContext } from '../hooks/useAuth'

//TODO handle retrieval of events on login
const Calendar = () => {
  const { user } = useAuthContext()
  const [modalOpen, setModalOpen] = useState(false)
  const calendarRef = useRef(null)
  const { events, dispatch } = useContext(EventContext)


  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'SET_EVENTS', payload: json });
      }
    };
    if (user) {
      fetchEvents();
    }
  }, [dispatch, user]);

  const headerToolbarOptions = {
    left: 'title',
  }
  
const footerToolbarOptions = {
  center: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
}

const handleDateClick = () => {
  setModalOpen(true)
}

  const handleEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(new Date (event.start)),
      end: moment(new Date(event.end)),
      title: event.title,
      address: event.address,
      price: event.price,
      first: event.first,
      last: event.last
    })
    setModalOpen(false)
  }

  const handleAddEventClick = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
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
      />
    </div>
    
    <div className="flex justify-center pt-4 mb-12">
      <button className='grid rounded-lg bg-blue-900 text-white p-2' onClick={handleAddEventClick}>Add Event</button>
    </div>
    <EventModal 
    className='opacity-100' 
    isOpen={modalOpen} 
    onClose={handleCloseModal} 
    onEventAdded={handleEventAdded} />
    </section>
  )
}
export default Calendar