import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SnackbarProvider> {/* We are using this here so that we can use the Snackbar in any component of the application */}
    <App />
  </SnackbarProvider >
  </BrowserRouter>,
)
