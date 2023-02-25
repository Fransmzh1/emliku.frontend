import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import 'react-toastify/dist/ReactToastify.css'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        hideProgressBar
        pauseOnFocusLoss={false}
      />
    </div>
  )
}

export default DefaultLayout
