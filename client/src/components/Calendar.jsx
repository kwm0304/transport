import { useState, useRef } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from './EventModal'
import moment from 'moment'

//TODO after initial event, moment doesn't capture time. Inspect line 17
//est crud routes in controllers
const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)
  console.log('EVENTS', [events])
  const headerToolbarOptions = {
    left: 'title',
  }
  
const footerToolbarOptions = {
  center: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
}

const handleDateClick = (event) => {
  setEvents((prevEvents) => [...prevEvents, event])
  setModalOpen(true)
}

  const handleEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(event.start),
      end: event.end,
      title: event.title,
      address: event.address,
      price: event.price,
      first: event.first,
      last: event.last
    })
    setEvents([...events, event]);
    setModalOpen(false)
  }

  const handleAddEventClick = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleDateSet = () => {

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
      datesSet={(date) => handleDateSet(date)}
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