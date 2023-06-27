
// app is a react app
import React from 'react'
//react DOM will allow you to render elements and components in DOM more effectively
import ReactDOM from 'react-dom/client'
// import styles
import './index.css'
// to display app
import App from './App'
//for implementing dynamic routing in dom, specifically BrowserRouter
import { BrowserRouter } from 'react-router-dom'
//Display based on whether the user is logged in
import { AuthContextProvider } from './store/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
//need tags for the browser routing and the auth context because these two are powering what the user sees across the app, then the app renders inside those
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)
