import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import config from 'src/config.js'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {
  const [newEmail, setNewEmail] = useState('')
  const [lembaga, setLembaga] = useState('')
  const [nama, setNama] = useState('')

  const navigate = useNavigate()

  const handleNewUser = async () => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    const fileHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + _loginfo.basic,
    }
    try {
      await axios({
        method: 'post',
        url: config.BACKEND_URL + '/usermgmt/register',
        data: { nama: nama, email: newEmail, lembaga: lembaga },
        headers: fileHeaders,
      })
      alert('Pembuatan User Berhasil.')
      navigate('/userlist')
    } catch (error) {
      console.log('ERror response: ' + JSON.stringify(error.response))
      let _response = error.response
      if (_response.status === 409) {
        alert('Error: Data yang sama sudah tercatat')
      }
    }
  }

  return (
    <>
      <CForm onSubmit={handleNewUser}>
        <CCard>
          <CCardHeader>
            <h4>Create New User</h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CFormLabel htmlFor="email" className="col-sm-3 col-form-label">
                Nama:
              </CFormLabel>
              <CCol sm={7}>
                <CFormInput
                  size="sm"
                  type="text"
                  value={nama}
                  required
                  id="nama"
                  onChange={(e) => setNama(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CFormLabel htmlFor="email" className="col-sm-3 col-form-label">
                Email:
              </CFormLabel>
              <CCol sm={7}>
                <CFormInput
                  size="sm"
                  type="text"
                  value={newEmail}
                  required
                  id="email"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CFormLabel htmlFor="lembaga" className="col-sm-3 col-form-label">
                Lembaga:
              </CFormLabel>
              <CCol sm={7}>
                <CFormSelect
                  size="sm"
                  id="lembaga"
                  value={lembaga}
                  required
                  onChange={(e) => setLembaga(e.target.value)}
                >
                  <option value="">Pilih Lembaga</option>
                  <option value="EMLIKU">EMLIKU</option>
                  <option disabled value="BINAWAN">
                    BINAWAN
                  </option>
                  <option disabled value="AAI">
                    AAI
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton color="primary" className="me-md-2" onClick={() => navigate('/userlist')}>
                Cancel
              </CButton>
              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </CForm>
    </>
  )
}

export default UserForm
