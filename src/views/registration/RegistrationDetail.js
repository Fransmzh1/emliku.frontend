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
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

const backendClient = axios.create({
  baseURL: config.BACKEND_URL,
})

const RegistrationDetail = () => {
  const [loading, setLoading] = useState(false)
  const [detailData, setDetailData] = useState({})
  const [ktpUrl, setKtpUrl] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    let email = location.state.email
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/registration/' + _loginfo.lembaga + '?email=' + email,
          headers: { Authorization: 'Basic ' + _loginfo.basic },
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
  }, [location.state.email])

  useEffect(() => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    if (!detailData.email) return
    console.log('akan ambil gambar ' + detailData.email)
    const loadData = async () => {
      try {
        const response = await backendClient({
          method: 'get',
          url: '/download/file/photo?email=' + detailData.email,
          headers: { Authorization: 'Basic ' + _loginfo.basic },
          responseType: 'blob',
        })
        const blob = new Blob([response.data], { type: 'application/zip' })
        const url = URL.createObjectURL(blob)
        setPhotoUrl(url)
        console.log('done download foto')
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }

      try {
        const response = await backendClient({
          method: 'get',
          url: '/download/file/ktp?email=' + detailData.email,
          headers: { Authorization: 'Basic ' + _loginfo.basic },
          responseType: 'blob',
        })
        const blob = new Blob([response.data], { type: 'application/zip' })
        const url = URL.createObjectURL(blob)
        setKtpUrl(url)
        console.log('done download ktp')
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
                  <CCol sm={4}>Alamat[Kabupaten]:</CCol>
                  <CCol>{detailData.addrKabupaten}</CCol>
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
                  <CCol>{detailData.lembaga}</CCol>
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
              </CCol>
              <CCol sm={4}>
                <CImage fluid src={photoUrl} />
                <CImage fluid src={ktpUrl} />
              </CCol>
            </CRow>
          </CCardBody>
        )}
        <CCardFooter>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <CButton
              color="primary"
              className="me-md-2"
              onClick={() => navigate('/registrationlist')}
            >
              Back
            </CButton>
            <CButton color="primary" onClick={handleDownloadDataDetail}>
              Download
            </CButton>
          </div>
        </CCardFooter>
      </CCard>
    </>
  )
}

RegistrationDetail.propTypes = {
  data: PropTypes.string,
}

export default RegistrationDetail
