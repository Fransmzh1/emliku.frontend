import React, { useState } from 'react'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from 'src/assets/brand/lpk_emliku.png'
import config from 'src/config.js'

const Login = () => {
  // const [signup, setSignup] = useState(false)
  // const [formMode, setFormMode] = useState('Login')
  const [emailaddr, setEmailaddr] = useState()
  const [passwd, setPasswd] = useState()
  const [confirmMsg, setConfirmMsg] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const forwardTo = location.state?.prev ? location.state.prev : '/registrationlist'

  const backendClient = axios.create({
    baseURL: config.BACKEND_URL,
  })

  // const handleSignup = async (e) => {
  //   e.preventDefault()
  //   console.log('Signup')
  //   try {
  //     const response = await backendClient({
  //       method: 'post',
  //       url: '/usermgmt/register',
  //       data: { email: emailaddr, password: passwd },
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     console.log('Sukses')
  //     setConfirmMsg('Aktivasi user silakan check di email ' + emailaddr)
  //     setSignup(false)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(emailaddr)
    try {
      const response = await backendClient({
        method: 'post',
        url: '/usermgmt/login',
        data: { email: emailaddr, password: passwd },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('Login Sukses')
      // console.log(JSON.stringify(response.data))
      let expires_at = new Date().getTime() + 1800000
      let _loginfo = {
        email: emailaddr,
        basic: response.data.accessToken,
        eat: expires_at,
        lembaga: response.data.lembaga,
        admin: response.data.admin,
      }
      sessionStorage.setItem('loginfo', JSON.stringify(_loginfo))
      setConfirmMsg('Aktivasi user silakan check di email ' + emailaddr)
      // setSignup(false)
      navigate(forwardTo, { replace: true })
    } catch (error) {
      console.log(error)
      setConfirmMsg(error.message)
      setShowAlert(true)
    }
  }

  return (
    <div className="bg-light min-vh-80 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className="mb-3" style={{ maxWidth: '640px' }}>
            <CRow className="g-0">
              <CCol className="align-self-center" md={5}>
                <CCardImage src={logo} />
              </CCol>
              <CCol md={7}>
                <CCardBody>
                  <CCardTitle>Login</CCardTitle>
                  <CCardText>Login menggunakan email</CCardText>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmailaddr(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPasswd(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      {showAlert && <CAlert color="primary">{confirmMsg}</CAlert>}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setEmail: PropTypes.func,
}

export default Login