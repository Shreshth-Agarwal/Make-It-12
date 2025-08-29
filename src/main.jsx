import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#F5F5DC',
            color: '#5C4033',
            border: '2px solid #8B5E3C',
            borderRadius: '8px',
            fontFamily: 'Open Sans, sans-serif'
          }
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
