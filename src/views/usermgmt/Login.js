import React, { useState } from 'react'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from 'src/assets/brand/lpk_emliku.png'
import config from 'src/config.js'
import { toast } from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('')
  const [passwd, setPasswd] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const forwardTo = location.state?.prev ? location.state.prev : '/registrationlist'

  const backendClient = axios.create({
    baseURL: config.BACKEND_URL,
  })

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await backendClient({
        method: 'post',
        url: '/usermgmt/login',
        data: { nama: username, password: passwd },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log('Login sukses: ' + response.data)
      sessionStorage.setItem('userType', response.data.admin === 'true' ? 'admin' : 'operator')
      sessionStorage.setItem('authCode', response.data.accessToken)
      sessionStorage.setItem('username', username)
      setLoading(false)
      navigate(forwardTo, { replace: true })
    } catch (error) {
      setLoading(false)
      console.log(error.response)
      toast.error(error.response.data)
    }
  }

  return (
    <div className="bg-light min-vh-80 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className="mb-3" style={{ maxWidth: '640px' }}>
            <CRow className="g-0">
              <CCol className="align-self-center" md={3}>
                <CCardImage src={logo} />
              </CCol>
              <CCol md={7}>
                <CCardBody>
                  <CCardTitle>Login</CCardTitle>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPasswd(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton> */}
                        <CButton disabled={loading} onClick={handleLogin}>
                          {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                          Login
                        </CButton>                      </CCol>
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
