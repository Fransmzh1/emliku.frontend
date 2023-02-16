import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedPelamar = () => {
  const _loginfo = sessionStorage.getItem('kandidatloginfo')
  const location = useLocation()
  // const { emailAddr, authCode } = location.state

  console.log('on Protexted kandidatloginfo: ' + _loginfo)
  console.log('on Protexted: ' + JSON.stringify(location.state))
  if (!_loginfo) {
    // if (!location.state) {
    console.log('akan login')
    return <Navigate to="/loginpelamar" state={{ prev: '/compro' }} replace />
  }

  return <Outlet />
}

export default ProtectedPelamar
