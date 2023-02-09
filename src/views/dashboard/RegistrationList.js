import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import config from 'src/config.js'
import DataTable from 'react-data-table-component'

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
})

const RegistrationList = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [detailData, setDetailData] = useState()
  var checkedRows = []

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
      name: 'Propinsi',
      selector: (row) => row.addrPropinsi,
      sortable: true,
    },
    {
      name: 'Show',
      cell: (row) => <button onClick={() => handleShowDetail(row.email)}>Detail</button>,
    },
  ]
  const items = rows.map((h) => {
    return {
      email: h.email,
      nama: h.nama,
      noKtp: h.noKtp,
      registerDate: h.registerDate.substring(0, 10),
      addrPropinsi: h.addrPropinsi,
    }
  })

  useEffect(() => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/registrations',
          headers: { Authorization: 'Basic ' + _loginfo.basic },
        })
        setRows(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    setLoading(false)
    loadData()
  }, [])

  const handleShowDetail = async (emailAddr) => {
    setLoading(true)
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    try {
      const response = await backendClient({
        method: 'get',
        url: '/registration?email=' + emailAddr,
        headers: { Authorization: 'Basic ' + _loginfo.basic },
      })
      setDetailData(response.data)
      setShowDetail(true)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

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
      {!showDetail && (
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Daftar Registration</h4>
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
      )}
      {showDetail && (
        <CCard>
          <CCardHeader>
            <h4>Detail Registration</h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={4}>Email:</CCol>
              <CCol>{detailData.email}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Nama:</CCol>
              <CCol>{detailData.nama}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Jenis Kelamin:</CCol>
              <CCol>{detailData.jenisKelamin}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Agama:</CCol>
              <CCol>{detailData.agama}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Warganegara:</CCol>
              <CCol>{detailData.warganegara}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Pendidikan Terakhir:</CCol>
              <CCol>{detailData.pendidikan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[Jalan]:</CCol>
              <CCol>{detailData.addrJalan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[RTRW-No]:</CCol>
              <CCol>
                {detailData.addrRtrw}-{detailData.addrNo}
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[Kelurahan]:</CCol>
              <CCol>{detailData.addrKelurahan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[Kecamatan]:</CCol>
              <CCol>{detailData.addrKecamatan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[Propinsi]:</CCol>
              <CCol>{detailData.addrPropinsi}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Alamat[KodeArea]:</CCol>
              <CCol>{detailData.addrKodearea}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No HP:</CCol>
              <CCol>{detailData.noHp}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No KTP:</CCol>
              <CCol>{detailData.noKtp}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No KK:</CCol>
              <CCol>{detailData.noKk}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No SIM:</CCol>
              <CCol>{detailData.noSim}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No NPWP:</CCol>
              <CCol>{detailData.noNpwp}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No BPJS:</CCol>
              <CCol>{detailData.noBpjs}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Sosial Media:</CCol>
              <CCol>{detailData.socmed}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Nama Ayah:</CCol>
              <CCol>{detailData.namaAyah}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Nama Ibu:</CCol>
              <CCol>{detailData.namaIbu}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Nama Gadis Ibu:</CCol>
              <CCol>{detailData.namaGadisIbu}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Keluarga Tdk Serumah[nama]:</CCol>
              <CCol>{detailData.tdkSerumahNama}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Keluarga Tdk Serumah[no-hp]:</CCol>
              <CCol>{detailData.tdkSerumahNohp}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Pengalaman Kerja[bidang]:</CCol>
              <CCol>{detailData.pengalamanBidang}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Pengalaman Kerja[lama]:</CCol>
              <CCol>{detailData.pengalamanLamakerja}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Pengalaman Kerja[keterangan]:</CCol>
              <CCol>{detailData.pengalamanKeterangan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Nama Agen:</CCol>
              <CCol>{detailData.referalAgent}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Lembaga:</CCol>
              <CCol>{detailData.referalGroupPerusahaan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Negara Tujuan:</CCol>
              <CCol>{detailData.negaraTujuan}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Program Kerja:</CCol>
              <CCol>{detailData.program}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Lama Program Kerja:</CCol>
              <CCol>{detailData.durasiProgram}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>Bank:</CCol>
              <CCol>{detailData.buktiTransferBank}</CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>No Rekening - Nama:</CCol>
              <CCol>
                {detailData.buktiTransferNorek} - {detailData.buktiTransferNama}
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton onClick={() => setShowDetail(false)}>Back</CButton>
          </CCardFooter>
        </CCard>
      )}
    </>
  )
}

export default RegistrationList
