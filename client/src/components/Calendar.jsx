import { useState, useRef } from 'react'
//imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

//est crud routes in controllers
const Calendar = () => {
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.customEvents({
      title: '',
      start: (event.start).toDate(),
      end: (event.end).toDate(),
      address: '',
      store: '',
      price: 100

    })
  }

  
  
  
  return (
    <div>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView='dayGridDay'
      events={customEvents.map((event) => ({
        ...event,
        extendedProps: {
          title: event.title,
          start: event.start,
          end: event.end,
          address: event.address,
          store: event.store,
          price: event.price
        },
      }))}
      />
    </div>
  )
}
export default Calendar