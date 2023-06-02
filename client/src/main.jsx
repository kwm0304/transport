import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EventContextProvider } from './context/EventContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import "react-datetime/css/react-datetime.css"
import { PhonebookContextProvider } from './context/PhonebookContext.jsx'
import { ExpenseContextProvider } from './context/ExpenseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <PhonebookContextProvider>
          <ExpenseContextProvider>
            <App />
          </ExpenseContextProvider>
        </PhonebookContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
