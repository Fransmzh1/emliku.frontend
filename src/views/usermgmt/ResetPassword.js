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
import { cilUser } from '@coreui/icons'
import logo from 'src/assets/brand/lpk_emliku.png'

const ResetPassword = () => {
  const [emailaddr, setEmailaddr] = useState()
  const [confirmMsg, setConfirmMsg] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const gotoLogin = location.state?.prev ? location.state.prev : '/login'

  const backendClient = axios.create({
    baseURL: 'http://localhost:8080',
  })

  const handleReset = async (e) => {
    e.preventDefault()
    console.log('Reset')
    try {
      await backendClient({
        method: 'post',
        url: '/resetpw',
        data: { email: emailaddr },
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('Sukses')
      setConfirmMsg('Info password dikirim ke email.')
      navigate('/login')
    } catch (error) {
      console.log(error.message)
      setConfirmMsg(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className="mb-3" style={{ maxWidth: '640px' }}>
            <CRow className="g-0">
              <CCol className="align-self-center" md={5}>
                <CCardImage src={logo} />
              </CCol>
              <CCol md={7}>
                <CCardBody>
                  <CCardTitle>Reset Password</CCardTitle>
                  <CCardText>Masukkan email untuk dikirim info password yang baru</CCardText>
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleReset}>
                          Reset
                        </CButton>
                      </CCol>
                      {showAlert && <CAlert color="primary">{confirmMsg}</CAlert>}
                    </CRow>
                    <CRow>
                      <CCol xs={6} className="text-left">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => navigate(gotoLogin, { replace: true })}
                        >
                          Login
                        </CButton>
                      </CCol>
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

export default ResetPassword
