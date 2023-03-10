import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  // const _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
  const authcode = sessionStorage.getItem('authCode')

  if (!authcode) {
    console.log('akan login')
    return <Navigate to="/login" state={{ prev: '/compro' }} replace />
  }

  // let _directTo = _loginfo.admin ? '/registrationlist' : 'registration'

  // console.log('estimasi waktu ' + (_loginfo.eat - new Date().getTime()))
  // if (new Date().getTime() > _loginfo.eat) {
  //   console.log('expired')
  //   sessionStorage.removeItem('loginfo')
  //   return <Navigate to="/login" state={{ prev: _directTo }} replace />
  // }
  return <Outlet />
}

export default ProtectedRoute
