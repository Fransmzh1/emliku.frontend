import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CImage,
  CRow,
} from '@coreui/react'
import config from 'src/config.js'
// import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import attachmentList from './attachmentList'
import FileLinkRow from './FileLinkRow'
const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
})

const RegistrationDetail = () => {
  const [loading, setLoading] = useState(false)
  const [detailData, setDetailData] = useState()
  const [ktpUrl, setKtpUrl] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const navigate = useNavigate()
  const prev = sessionStorage.getItem('prevloc')
  const usertype = sessionStorage.getItem('userType')

  useEffect(() => {
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/registration?email=' + sessionStorage.getItem('kandidatemail'),
          headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
          withCredentials: true,
        })
        setDetailData(response.data[0])
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (!detailData) return
    console.log('akan ambil gambar ' + detailData.email)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/download/file/photo?email=' + detailData.email,
          headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
          responseType: 'blob',
        })
        console.log('headers ' + JSON.stringify(response.headers['content-type']))
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const url = URL.createObjectURL(blob)
        setPhotoUrl(url)
        // URL.revokeObjectURL(url)
        console.log('done download foto')
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }

      try {
        const response = await backendClient({
          method: 'get',
          url: '/download/file/ktp?email=' + detailData.email,
          headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
          responseType: 'blob',
        })
        console.log(JSON.stringify(response))
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const url = URL.createObjectURL(blob)
        setKtpUrl(url)
        console.log('done download ktp')
        // URL.revokeObjectURL(url)
      } catch (error) {
        console.log('gagal download ktp')
        console.log(error.message)
        setLoading(false)
      }
    }
    loadData()
  }, [detailData])

  const handleDownloadDataDetail = async () => {
    let emails = [detailData.email]
    console.log('downloading ' + JSON.stringify(emails))
    setLoading(true)
    const formData = emails
    try {
      const response = await backendClient({
        method: 'post',
        url: '/download/registration',
        data: formData,
        headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
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
      <CCard>
        <CCardHeader>
          <h4>Detail Registration</h4>
        </CCardHeader>
        {loading && (
          <CCardBody>
            <CRow>
              <CCol>Loading ...</CCol>
            </CRow>
          </CCardBody>
        )}
        {detailData && (
          <CCardBody>
            <CRow>
              <CCol>
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
                  <CCol>{detailData.jeniskelamin}</CCol>
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
                  <CCol>{detailData.jalan}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[RTRW-No]:</CCol>
                  <CCol>
                    {detailData.rtrw}-{detailData.addrNo}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[Kelurahan]:</CCol>
                  <CCol>{detailData.kelurahan}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[Kecamatan]:</CCol>
                  <CCol>{detailData.kecamatan}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[Kabupaten]:</CCol>
                  <CCol>{detailData.kabupaten}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[Propinsi]:</CCol>
                  <CCol>{detailData.propinsi}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Alamat[KodeArea]:</CCol>
                  <CCol>{detailData.kodearea}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No HP:</CCol>
                  <CCol>{detailData.nohp}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No KTP:</CCol>
                  <CCol>{detailData.noktp}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No KK:</CCol>
                  <CCol>{detailData.nokk}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No SIM:</CCol>
                  <CCol>{detailData.nosim}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No NPWP:</CCol>
                  <CCol>{detailData.nonpwp}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>No BPJS:</CCol>
                  <CCol>{detailData.nobpjs}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Sosial Media:</CCol>
                  <CCol>{detailData.socmed}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Nama Ayah:</CCol>
                  <CCol>{detailData.namaayah}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Nama Ibu:</CCol>
                  <CCol>{detailData.namaibu}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Nama Gadis Ibu:</CCol>
                  <CCol>{detailData.namagadisibu}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Keluarga Tdk Serumah[nama]:</CCol>
                  <CCol>{detailData.kltdkserumahnama}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Keluarga Tdk Serumah[no-hp]:</CCol>
                  <CCol>{detailData.kltdkserumahnohp}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Pengalaman Kerja[bidang]:</CCol>
                  <CCol>{detailData.pengalamanbidang}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Pengalaman Kerja[lama]:</CCol>
                  <CCol>{detailData.pengalamanlamakerja}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Pengalaman Kerja[keterangan]:</CCol>
                  <CCol>{detailData.pengalamanketerangan}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Nama Agen:</CCol>
                  <CCol>{detailData.referalagent}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Lembaga:</CCol>
                  <CCol>{detailData.lembaga}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Negara Tujuan:</CCol>
                  <CCol>{detailData.negaratujuan}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Program Kerja:</CCol>
                  <CCol>{detailData.program}</CCol>
                </CRow>
                <CRow>
                  <CCol sm={4}>Lama Program Kerja:</CCol>
                  <CCol>{detailData.durasiprogram}</CCol>
                </CRow>
              </CCol>
              <CCol sm={4}>
                <CImage fluid src={photoUrl} />
                <CImage fluid src={ktpUrl} />
              </CCol>
            </CRow>
            <CCard>
              <CCardHeader>Dokumen Pendukung</CCardHeader>
              <CCardBody>
                {attachmentList.map((att, idx) => (
                  <FileLinkRow
                    key={idx}
                    ft={att}
                    attachments={detailData.attachments}
                    email={detailData.email}
                  />
                ))}
              </CCardBody>
            </CCard>
          </CCardBody>
        )}
        <CCardFooter>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <CButton
              color="primary"
              className="me-md-2"
              onClick={() => navigate(prev, { replace: true })}
            >
              Back
            </CButton>
            {usertype === 'admin' && (
              <CButton color="primary" onClick={handleDownloadDataDetail}>
                Download
              </CButton>
            )}
          </div>
        </CCardFooter>
      </CCard>
    </>
  )
}

// RegistrationDetail.propTypes = {
//   ft: PropTypes.object,
// }

export default RegistrationDetail
