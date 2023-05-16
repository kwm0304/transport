import { useState, useRef } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

//est crud routes in controllers
const Calendar = () => {
  // const [open, setOpen] = useState(false)
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
  const newEvent = {
    title: 'New Event',
    start: (arg.start).toDate(), 
    end: (arg.date).toDate(),
    first: arg.first,
    last: arg.last,
    address: arg.address,
    price: arg.price
  }
  setEvents([...calendarRef.current, newEvent])
}

  return (
    <div className='text-blue-900 font-bold mx-1 mt-12'>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView='dayGridDay'
      headerToolbar={headerToolbarOptions}
      footerToolbar={footerToolbarOptions}
      dateClick={handleDateClick}
      events={events}
      />
    </div>
  )
}
export default Calendar