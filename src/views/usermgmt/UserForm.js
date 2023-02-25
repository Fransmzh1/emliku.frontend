import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'

const UserForm = () => {
  const [newEmail, setNewEmail] = useState('')
  const [lembaga, setLembaga] = useState('')
  const [lembagas, setLembagas] = useState([])
  const [nama, setNama] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: config.BACKEND_URL + '/master/lembaga',
          headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
          withCredentials: true,
        })
        console.log('inilah: ' + JSON.stringify(response.data))
        setLembagas(response.data)
      } catch (error) {
        console.log(JSON.stringify(error))
        toast.error(error.message)
      }
    }
    loadData()
  }, [])

  const handleNewUser = async () => {
    let authcode = sessionStorage.getItem('authCode')
    const fileHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + authcode,
    }
    try {
      await axios({
        method: 'post',
        url: config.BACKEND_URL + '/usermgmt/register',
        data: { nama: nama, email: newEmail, lembaga: lembaga },
        headers: fileHeaders,
      })
      toast.success('Pembuatan User Berhasil.')
      navigate('/userlist')
    } catch (error) {
      console.log('Error response: ' + JSON.stringify(error.response))
      let _response = error.response
      if (_response.status === 409) {
        toast.error('Error: Data yang sama sudah tercatat')
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
                  {lembagas.map((l) => (
                    <option key={l.kode} value={l.kode}>
                      {l.nama}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton color="primary" className="me-sm-2" onClick={() => navigate('/userlist')}>
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
