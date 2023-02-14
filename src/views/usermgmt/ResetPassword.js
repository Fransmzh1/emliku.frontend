import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import config from 'src/config'

const ResetPassword = () => {
  const [confirmMsg, setConfirmMsg] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [oldPasswd, setOldPasswd] = useState('')
  const [newPasswd1, setNewPasswd1] = useState('')
  const [newPasswd2, setNewPasswd2] = useState('')
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    if (newPasswd1 !== newPasswd2) {
      console.log(newPasswd1 + ' ' + newPasswd2)
      alert('Password baru belum sama')
      return
    }

    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    console.log('Reset')
    try {
      await axios({
        method: 'post',
        url: config.BACKEND_URL + '/usermgmt/resetpw',
        data: { username: _loginfo.name, oldPassword: oldPasswd, newPassword: newPasswd1 },
        headers: { Authorization: 'Basic ' + _loginfo.basic },
      })
      console.log('Sukses')
      alert('Sudah berhasil diganti.')
      sessionStorage.removeItem('loginfo')
      navigate('/login')
    } catch (error) {
      console.log(error.message)
      setShowAlert(true)
      setConfirmMsg(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-80 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CForm onSubmit={handleReset}>
              <CCard className="mb-3" style={{ maxWidth: '640px' }}>
                <CCardHeader>
                  <h4>Reset Password</h4>
                </CCardHeader>
                <CCardBody>
                  <CCardText>Masukkan password lama dan password baru.</CCardText>
                  <CRow>
                    <CFormLabel htmlFor="oldpw" className="col-sm-4 col-form-label">
                      Password Asal:
                    </CFormLabel>
                    <CCol sm={7}>
                      <CFormInput
                        size="sm"
                        type="password"
                        required
                        id="oldpw"
                        onChange={(e) => setOldPasswd(e.target.value)}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CFormLabel htmlFor="oldpw" className="col-sm-4 col-form-label">
                      Password Baru:
                    </CFormLabel>
                    <CCol sm={7}>
                      <CFormInput
                        size="sm"
                        type="password"
                        required
                        id="newpw1"
                        onChange={(e) => setNewPasswd1(e.target.value)}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CFormLabel htmlFor="oldpw" className="col-sm-4 col-form-label">
                      Konfirmasi :
                    </CFormLabel>
                    <CCol sm={7}>
                      <CFormInput
                        size="sm"
                        type="password"
                        required
                        id="newpw2"
                        onChange={(e) => setNewPasswd2(e.target.value)}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Reset
                      </CButton>
                    </CCol>
                    {showAlert && <CAlert color="primary">{confirmMsg}</CAlert>}
                  </CRow>
                </CCardFooter>
              </CCard>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
