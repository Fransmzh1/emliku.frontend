import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader } from '@coreui/react'
import config from 'src/config.js'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

// const backendClient = axios.create({
//   baseURL: config.BACKEND_URL,
// })

const UserForm = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  // var checkedRows = []
  const navigate = useNavigate()

  const columns = [
    {
      name: 'Email',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Lembaga',
      selector: (row) => row.institusi,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    // {
    //   name: 'Action',
    //   cell: (row) => <button onClick={() => handleShowDetail(row.email)}>Edit</button>,
    // },
  ]

  const items = rows.map((h) => {
    return {
      username: h.username,
      institusi: h.institusi,
      status: h.accountEnabled ? 'Enable' : 'Disabled',
    }
  })

  useEffect(() => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: config.BACKEND_URL + '/usermgmt/userlist',
          headers: { Authorization: 'Basic ' + _loginfo.basic },
          // headers: { Authorization: 'Basic ZnJhbnMubWF6aGFyQGdtYWlsLmNvbTpmYXJpemdhMQ==' },
        })
        // console.log(JSON.stringify(response.data))
        setRows(response.data)
        setLoading(false)
      } catch (error) {
        console.log('dalam error')
        console.log(error)
      }
    }
    loadData()
  }, [])

  // const handleRowSelected = ({ selectedRows }) => {
  //   checkedRows = selectedRows
  //   console.log('selected ' + JSON.stringify(checkedRows))
  // }

  // const handleNewUser = async () => {
  //   let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
  //   const fileHeaders = {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Basic ' + _loginfo.basic,
  //   }
  //   const formData = new FormData()
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: config.BACKEND_URL + '/usermgmt/register',
  //       data: { email: newEmail, lembaga: newLembaga },
  //       headers: fileHeaders,
  //     })
  //     setLoading(false)
  //     console.log(response)
  //   } catch (error) {
  //     setLoading(false)
  //     console.log('ERror response: ' + JSON.stringify(error.response))
  //     let _response = error.response
  //     if (_response.status === 409) setErrorMsg('Data yang sama sudah tercatat')
  //     alert('Error: Data yang sama sudah tercatat')
  //   }
  // }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Daftar User Aplikasi</h4>
        </CCardHeader>
        <CCardBody>
          <DataTable
            pagination
            // selectableRows
            // selectableRowsHighlight
            // selectableRowsVisibleOnly="true"
            // onSelectedRowsChange={handleRowSelected}
            highlightOnHover
            columns={columns}
            data={items}
            progressPending={loading}
          />
        </CCardBody>
        <CCardFooter>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <CButton color="primary" className="me-md-2" onClick={() => navigate('/userform')}>
              Buat User Baru
            </CButton>
          </div>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default UserForm
