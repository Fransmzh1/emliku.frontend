import React, { useState } from 'react'
import axios from 'axios'
// import PropTypes from 'prop-types'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormInput,
  CFormLabel,
  CCardHeader,
  CAlert,
  CCardSubtitle,
  CCardText,
} from '@coreui/react'
import config from 'src/config.js'
import { Navigate } from 'react-router-dom'

const LoginPelamar = () => {
  const [pin, setPin] = useState('')
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertEmailVisible, setAlertEmailVisible] = useState(false)
  const [alertPinVisible, setAlertPinVisible] = useState(false)
  const [alertMsg, setAlertMsg] = useState()
  const [redirect, setRedirect] = useState()

  const handleRequestPin = async (e) => {
    if (!email) return
    e.preventDefault()
    try {
      const response = await axios({
        method: 'post',
        url: config.BACKEND_URL + '/applicant/requestpin',
        data: { email: email },
        headers: { 'Content-Type': 'application/json' },
      })
      setLoading(false)
      console.log(JSON.stringify(response))
      if (response.data.status !== 'OK') {
        setAlertMsg(response.data.message)
        setAlertEmailVisible(true)
      } else {
        setAlertMsg('PIN sudah dikirim ke alamat email.')
        setAlertPinVisible(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmitPin = async (e) => {
    e.preventDefault()
    if (!pin || !email) return
    try {
      const response = await axios({
        method: 'post',
        url: config.BACKEND_URL + '/applicant/pinlogin',
        data: { email: email, password: pin },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      setLoading(false)
      console.log(JSON.stringify(response.data))
      if (response.data.status === 'OK') {
        let _loginfo = {
          email: email,
          token: response.data.token,
          regstatus: response.data.regStatus,
        }
        sessionStorage.setItem('kandidatloginfo', JSON.stringify(_loginfo))
        sessionStorage.setItem('kandidatemail', email)
        sessionStorage.setItem('authCode', response.data.token)
        sessionStorage.setItem('prevloc', '/loginpelamar')
        sessionStorage.setItem('userType', 'pelamar')
        sessionStorage.setItem('regStatus', response.data.regStatus)
        setAuthCode(response.data.token)
        // if (response.data.regStatus === 'submit') setRedirect('/regdetail2')
        // else setRedirect('/registrationentry')
        setRedirect(response.data.regStatus === 'submit' ? '/regdetail2' : '/registrationentry')
      } else {
        console.log(response.data.message)
        setAlertMsg(response.data.message)
        setAlertPinVisible(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <CCard>
        <CCardHeader>Verifikasi Email</CCardHeader>
        <CCardBody>
          <CCardSubtitle>
            Sebelum melakukan registrasi, verifikasi email anda dahulu.
            <p>Masukkan email address, lalu klik tombol &apos;Minta PIN&apos;</p>
            <p>PIN akan dikirim melakukan email</p>
          </CCardSubtitle>
          <CRow>
            <CFormLabel htmlFor="checkemail" className="col-sm-3 col-form-label">
              Email:
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                size="sm"
                type="text"
                id="checkemail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CCol>
            <CCol sm={3}>
              <CButton onClick={handleRequestPin}>Minta PIN</CButton>
            </CCol>
          </CRow>
          {alertEmailVisible && (
            <CRow>
              <CCol sm={6}>
                <CAlert color="danger" dismissible onClose={() => setAlertEmailVisible(false)}>
                  {alertMsg}
                </CAlert>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCardText>Masukkan no PIN yang diterima dari email </CCardText>
          </CRow>
          <CRow>
            <CFormLabel htmlFor="pin" className="col-sm-3 col-form-label">
              No PIN:
            </CFormLabel>
            <CCol sm={6}>
              <CFormInput
                size="sm"
                type="text"
                id="pin"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </CCol>
            <CCol sm={2}>
              <CButton onClick={handleSubmitPin}>Submit PIN</CButton>
            </CCol>
          </CRow>
          {alertPinVisible && (
            <CRow>
              <CCol sm={6}>
                <CAlert color="danger" dismissible onClose={() => setAlertPinVisible(false)}>
                  {alertMsg}
                </CAlert>
              </CCol>
            </CRow>
          )}
        </CCardBody>
      </CCard>
      {redirect && (
        <Navigate
          to={redirect}
          state={{ emailAddr: email, authCode: authCode, prev: '/program' }}
        />
      )}
    </>
  )
}

// Registration.propTypes = {
//   email: PropTypes.string,
// }

export default LoginPelamar
