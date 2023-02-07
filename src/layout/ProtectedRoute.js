import React, { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
  console.log('_loginfo: ' + _loginfo)
  if (!_loginfo) {
    console.log('akan login')
    return <Navigate to="/login" state={{ prev: location.pathname }} replace />
  }

  console.log('loginfo: ' + JSON.stringify(_loginfo))
  console.log('estimasi waktu ' + (_loginfo.eat - new Date().getTime()))
  if (new Date().getTime() > _loginfo.eat) {
    console.log('expired')
    sessionStorage.removeItem('loginfo')
    return <Navigate to="/login" state={{ prev: location.pathname }} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
