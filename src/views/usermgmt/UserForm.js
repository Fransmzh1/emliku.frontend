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
  CRow,
} from '@coreui/react'
import config from 'src/config.js'

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
})

const UserForm = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newLembaga, setNewLembaga] = useState('EMLIKU')
  const [detailData, setDetailData] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [pageStatus, setPageStatus] = useState('list')

  useEffect(() => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/usermgmt/userlist',
          headers: { Authorization: 'Basic ' + _loginfo.basic },
        })
        // console.log(JSON.stringify(response.data))
        setRows(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    loadData()
  }, [])

  const handleNewUser = async () => {
    setShowDetail(true)
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    const fileHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + _loginfo.basic,
    }
    const formData = new FormData()
    try {
      const response = await axios({
        method: 'post',
        url: config.BACKEND_URL + '/usermgmt/register',
        data: { email: newEmail, lembaga: newLembaga },
        headers: fileHeaders,
      })
      setLoading(false)
      console.log(response)
    } catch (error) {
      setLoading(false)
      console.log('ERror response: ' + JSON.stringify(error.response))
      let _response = error.response
      if (_response.status === 409) setErrorMsg('Data yang sama sudah tercatat')
      alert('Error: Data yang sama sudah tercatat')
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
                <CFormInput
                  size="sm"
                  type="text"
                  value={newLembaga}
                  id="lembaga"
                  disable
                  // onChange={(e) => setNewLembaga(e.target.value)}
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton color="primary" className="me-md-2" onClick={() => setPageStatus('list')}>
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
