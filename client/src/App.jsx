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
import Expenses from './components/Expenses'

//imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import { useAuthContext } from './hooks/useAuth'
import ExpenseTotals from './components/ExpenseTotals'
import RevenueTotal from './components/RevenueTotals'
import Analytics from './components/Analytics'
import Mileage from './components/Mileage'

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
          <Route
          path='/expenses'
          element={<Expenses />}
          />
          <Route
          path='/expenseTotals'
          element={<ExpenseTotals />}
          />
          <Route
          path='/eventTotals'
          element={<RevenueTotal />}
          />
          <Route
          path='/analytics'
          element={<Analytics />}
          />
          <Route
          path='/mileage'
          element={<Mileage />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
