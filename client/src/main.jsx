import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EventContextProvider } from './context/EventContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { PhonebookContextProvider } from './context/PhonebookContext.jsx'
import "react-datetime/css/react-datetime.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <PhonebookContextProvider>
        <App />
        </PhonebookContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
