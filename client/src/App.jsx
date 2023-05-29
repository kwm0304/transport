import './App.css'
//components
import Calendar from './components/Calendar'
import Nav from './components/Nav'
import Login from './components/Login'
import Signup from './components/Signup'
import EventModal from './components/EventModal'
import Dashboard from './components/Dashboard'
import Finances from './components/Finances'
import NoMatch from './components/NoMatch'
import StartOfDay from './components/StartOfDay'
import EventCard from './components/EventCard'
import Contacts from './components/Contacts'

//imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import { useAuthContext } from './hooks/useAuth'

function App() {
  const { user } = useAuthContext()
  return (
    <Router>
      <Nav />
      <div>
        <Routes>
          <Route
          path='/'
          element={user ? <Dashboard /> : <Navigate to='/login' />}
          />
          <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/' />}
          />
          <Route
          path='/calendar'
          element={<Calendar />}
          />
          <Route
          path='/modal'
          elememnt={<EventModal />}
          />
          <Route
          path='/finances'
          element={<Finances />}
          />
          <Route
          path='/sod'
          element={<StartOfDay />}  
          />        
          <Route 
          path='/*'
          element={<NoMatch />}
          />
          <Route
          path='/eventCard'
          element={<EventCard />}
          />
          <Route
          path='/contacts'
          element={<Contacts />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
