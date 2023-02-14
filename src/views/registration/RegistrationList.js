import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader } from '@coreui/react'
import config from 'src/config.js'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
})

const RegistrationList = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  var checkedRows = []

  const navigate = useNavigate()

  const columns = [
    {
      name: 'RegisterDate',
      selector: (row) => row.registerDate,
      sortable: true,
    },
    {
      name: 'Nama',
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'No KTP',
      selector: (row) => row.noKtp,
      sortable: true,
    },
    {
      name: 'Tujuan',
      selector: (row) => row.tujuan,
      sortable: true,
    },
    {
      name: 'Show',
      cell: (row) => (
        <button onClick={() => navigate('/regdetail', { state: { email: row.email } })}>
          Detail
        </button>
      ),
    },
  ]
  const items = rows.map((h) => {
    return {
      email: h.email,
      nama: h.nama,
      noKtp: h.noKtp,
      registerDate: h.registerDate.substring(0, 10),
      tujuan: h.negaraTujuan,
    }
  })

  useEffect(() => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/registration/' + _loginfo.lembaga,
          headers: { Authorization: 'Basic ' + _loginfo.basic },
          withCredentials: true,
        })
        setRows(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    loadData()
  }, [])

  const handleRowSelected = ({ selectedRows }) => {
    // setSelectedRows((prevState) => {
    //   console.log('prev ' + JSON.stringify(prevState))
    //   if (prevState !== rows) {
    //     return rows
    //   }
    //   return prevState
    // })
    // console.log('selected ' + selectedCount)
    // // setDownloadEnable(true)
    checkedRows = selectedRows
    console.log('selected ' + JSON.stringify(checkedRows))
  }

  const handleDownloadData = async () => {
    if (checkedRows.length === 0) {
      alert('Pilih dulu record yang akan didownload.')
      return
    }
    let emails = checkedRows.map((r) => r.email)
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    console.log('downloading ' + JSON.stringify(emails))
    setLoading(true)
    const formData = emails
    try {
      const response = await backendClient({
        method: 'post',
        url: '/download/registration',
        data: formData,
        headers: { Authorization: 'Basic ' + _loginfo.basic },
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'datapelamar.zip'
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Daftar Registrasi</h4>
        </CCardHeader>
        <CCardBody>
          <DataTable
            pagination
            selectableRows
            selectableRowsHighlight
            selectableRowsVisibleOnly="true"
            onSelectedRowsChange={handleRowSelected}
            highlightOnHover
            columns={columns}
            data={items}
            progressPending={loading}
          />
        </CCardBody>
        <CCardFooter>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <CButton color="primary" className="me-md-2" onClick={handleDownloadData}>
              Download Data
            </CButton>
          </div>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default RegistrationList
