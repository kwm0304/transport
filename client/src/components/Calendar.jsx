import { useState, useRef } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from './EventModal'
import moment from 'moment'

//est crud routes in controllers
const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(events);
  calendarRef.current = events

  // const onEventAdded = (event) => {
  //   let calendarApi = calendarRef.current.getApi()
  //   calendarApi.customEvents({
  //     title: '',
  //     start: (event.start).toDate(),
  //     end: (event.end).toDate(),
  //     address: '',
  //     store: '',
  //     price: 100

  //   })
  // }
  const headerToolbarOptions = {
    left: 'title',
  }
  
const footerToolbarOptions = {
  center: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
}

const handleDateClick = (arg) => {
  const calendarApi = arg.view.calendar;
  calendarApi.unselect();
  setModalOpen(true)
}

  const handleEventAdded = (event) => {
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
      ref={calendarRef}
      datesSet={(date) => handleDateSet(date)}
      eventAdd={(event) => handleEventAdded(event)}
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