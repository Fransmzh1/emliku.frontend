import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import 'react-toastify/dist/ReactToastify.css'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default DefaultLayout
