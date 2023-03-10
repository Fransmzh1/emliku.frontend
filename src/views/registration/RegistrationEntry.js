import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import PropTypes from 'prop-types'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCardHeader,
  CFooter,
  CSpinner,
  CFormCheck,
  CCardTitle,
  CCardSubtitle,
} from '@coreui/react'
import config from 'src/config.js'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegistrationEntry = () => {
  // const [emailAddr, setEmailAddr] = useState('')
  const [nama, setNama] = useState('')
  const [jalan, setJalan] = useState('')
  const [rtrw, setRtrw] = useState('')
  const [no, setNo] = useState('')
  const [propinsi, setPropinsi] = useState()
  const [kabupaten, setKabupaten] = useState({})
  const [kecamatan, setKecamatan] = useState({})
  const [kelurahan, setKelurahan] = useState()
  const [kodearea, setKodearea] = useState('')
  const [agama, setAgama] = useState()
  const [warganegara, setWarganegara] = useState()
  const [nohp, setNohp] = useState('')
  const [noktp, setNoktp] = useState('')
  const [nokk, setNokk] = useState('')
  const [nosim, setNosim] = useState('')
  const [nonpwp, setNonpwp] = useState('')
  const [nobpjs, setNobpjs] = useState('')
  const [jeniskelamin, setJeniskelamin] = useState('')
  const [namaayah, setNamaayah] = useState('')
  const [namaibu, setNamaibu] = useState('')
  const [namagadisibu, setNamagadisibu] = useState('')
  const [kltdkserumahnama, setKltdkserumahnama] = useState('')
  const [kltdkserumahnohp, setKltdkserumahnohp] = useState('')
  const [pendidikan, setPendidikan] = useState('')
  const [pengalamanbidang, setPengalamanbidang] = useState('')
  const [pengalamanlamakerja, setPengalamanlamakerja] = useState('')
  const [pengalamanketerangan, setPengalamanketerangan] = useState('')
  const [socmed, setSocmed] = useState('')
  const [referalagent, setReferalagent] = useState('')
  const [lembaga, setLembaga] = useState('EMLIKU')
  const [negaratujuan, setNegaratujuan] = useState('')
  const [program, setProgram] = useState('')
  const [durasiprogram, setDurasiprogram] = useState('')

  const [files, setFiles] = useState({})
  const [filePhoto, setFilePhoto] = useState()
  const [fileKtp, setFileKtp] = useState()
  const [filePassport, setFilePassport] = useState()
  const [fileSim, setFileSim] = useState()
  const [fileKk, setFileKk] = useState()
  const [fileNpwp, setFileNpwp] = useState()
  const [fileBpjs, setFileBpjs] = useState()
  const [fileSkck, setFileSkck] = useState()
  const [fileMcu, setFileMcu] = useState()
  const [fileAktelahir, setFileAktelahir] = useState()
  const [fileIjazah, setFileIjazah] = useState()
  const [fileSertIelt, setFileSertIelt] = useState()
  const [fileSertN4, setFileSertN4] = useState()
  const [fileSertJft, setFileSertJft] = useState()
  const [fileSertJlft, setFileSertJlft] = useState()
  const [filePersetujuanOrtu, setFilePersetujuanOrtu] = useState()
  const [fileBuktiTransfer, setFileBuktiTransfer] = useState()
  const [fileBukuTabungan, setFileBukuTabungan] = useState()
  const [fileSertVaksin1, setFileSertVaksin1] = useState()
  const [fileSertVaksin2, setFileSertVaksin2] = useState()
  const [fileSertBooster, setFileSertBooster] = useState()

  const [propinsilist, setPropinsilist] = useState([])
  const [kabupatenlist, setKabupatenlist] = useState([])
  const [kecamatanlist, setKecamatanlist] = useState([])
  const [kelurahanlist, setKelurahanlist] = useState([])
  const [newreg, setNewreg] = useState(true)
  const [disclaimer, setDisclaimer] = useState(false)
  const [loading, setLoading] = useState(false)

  const email = sessionStorage.getItem('kandidatemail')
  const authCode = sessionStorage.getItem('authCode')
  const regstatus = sessionStorage.getItem('regStatus')

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const loadData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: config.BACKEND_URL + '/master/propinsi',
          headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
        })
        setPropinsilist(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    loadData()
  }, [])

  const handleFileChanges = (e) => {
    console.log('Change file size ' + e.target.files[0].size)
    setFiles({ ...files, [e.target.id]: e.target.files[0] })
    if (e.target.files[0].size > 3197152) {
      alert('Ukuran file tidak boleh lebih dari 3 MB')
      e.target.files[0] = null
      return false
    }
    if (e.target.id === 'photo') {
      setFilePhoto(e.target.files[0])
    } else if (e.target.id === 'ktp') {
      setFileKtp(e.target.files[0])
    } else if (e.target.id === 'passport') {
      setFilePassport(e.target.files[0])
    } else if (e.target.id === 'sim') {
      setFileSim(e.target.files[0])
    } else if (e.target.id === 'kk') {
      setFileKk(e.target.files[0])
    } else if (e.target.id === 'aktelahir') {
      setFileAktelahir(e.target.files[0])
    } else if (e.target.id === 'npwp') {
      setFileNpwp(e.target.files[0])
    } else if (e.target.id === 'bpjs') {
      setFileBpjs(e.target.files[0])
    } else if (e.target.id === 'skck') {
      setFileSkck(e.target.files[0])
    } else if (e.target.id === 'mcu') {
      setFileMcu(e.target.files[0])
    } else if (e.target.id === 'ijazah') {
      setFileIjazah(e.target.files[0])
    } else if (e.target.id === 'sertIelt') {
      setFileSertIelt(e.target.files[0])
    } else if (e.target.id === 'sertN4') {
      setFileSertN4(e.target.files[0])
    } else if (e.target.id === 'sertJlft') {
      setFileSertJlft(e.target.files[0])
    } else if (e.target.id === 'sertJft') {
      setFileSertJft(e.target.files[0])
    } else if (e.target.id === 'persetujuanOrtu') {
      setFilePersetujuanOrtu(e.target.files[0])
    } else if (e.target.id === 'sertvaksin1') {
      setFileSertVaksin1(e.target.files[0])
    } else if (e.target.id === 'sertvaksin2') {
      setFileSertVaksin2(e.target.files[0])
    } else if (e.target.id === 'sertbooster') {
      setFileSertBooster(e.target.files[0])
    } else if (e.target.id === 'bukuTabungan') {
      setFileBukuTabungan(e.target.files[0])
    } else if (e.target.id === 'buktiTransfer') {
      setFileBuktiTransfer(e.target.files[0])
    }
  }

  const handlePropinsiChange = async (e) => {
    setPropinsi(e.target.value)
    try {
      const res = await axios({
        method: 'get',
        url: config.BACKEND_URL + '/master/kabupaten?propinsi=' + e.target.value,
        headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
      })
      setKabupatenlist(res.data)
      setKecamatanlist([])
      setKelurahanlist([])
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleKabupatenChange = async (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const kabupatenId = selectedOption.getAttribute('data-value')
    setKabupaten({ id: kabupatenId, kabupaten: e.target.value })
    try {
      const res = await axios({
        method: 'get',
        url: config.BACKEND_URL + '/master/kecamatan?kabupaten=' + kabupatenId,
        headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
      })
      setKecamatanlist(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleKecamatanChange = async (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const kecamatanId = selectedOption.getAttribute('data-value')
    setKecamatan({ id: kecamatanId, kecamatan: e.target.value })
    try {
      const res = await axios({
        method: 'get',
        url: config.BACKEND_URL + '/master/kelurahan?kecamatan=' + kecamatanId,
        headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
      })
      setKelurahanlist(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const myFormData = () => {
    let _filesIncluded = ''
    let _files = []
    if (filePhoto) {
      _filesIncluded += 'photo '
      _files.push(filePhoto)
    }
    if (fileKtp) {
      _filesIncluded += 'ktp '
      _files.push(fileKtp)
    }
    if (filePassport) {
      _filesIncluded += 'passport '
      _files.push(filePassport)
    }
    if (fileKk) {
      _filesIncluded += 'kk '
      _files.push(fileKk)
    }
    if (fileSim) {
      _filesIncluded += 'sim '
      _files.push(fileSim)
    }
    if (fileAktelahir) {
      _filesIncluded += 'aktelahir '
      _files.push(fileAktelahir)
    }
    if (fileNpwp) {
      _filesIncluded += 'npwp '
      _files.push(fileNpwp)
    }
    if (fileBpjs) {
      _filesIncluded += 'bpjs '
      _files.push(fileBpjs)
    }
    if (fileSkck) {
      _filesIncluded += 'skck '
      _files.push(fileSkck)
    }
    if (fileMcu) {
      _filesIncluded += 'mcu '
      _files.push(fileMcu)
    }
    if (fileIjazah) {
      _filesIncluded += 'ijazah '
      _files.push(fileIjazah)
    }
    if (fileSertIelt) {
      _filesIncluded += 'sertIelt '
      _files.push(fileSertIelt)
    }
    if (fileSertN4) {
      _filesIncluded += 'sertN4 '
      _files.push(fileSertN4)
    }
    if (fileSertJlft) {
      _filesIncluded += 'sertJlft '
      _files.push(fileSertJlft)
    }
    if (fileSertJft) {
      _filesIncluded += 'sertJft '
      _files.push(fileSertJft)
    }
    if (fileSertVaksin1) {
      _filesIncluded += 'vaksin1 '
      _files.push(fileSertVaksin1)
    }
    if (fileSertVaksin2) {
      _filesIncluded += 'vaksin2 '
      _files.push(fileSertVaksin2)
    }
    if (fileSertBooster) {
      _filesIncluded += 'booster '
      _files.push(fileSertBooster)
    }
    if (filePersetujuanOrtu) {
      _filesIncluded += 'persetujuanOrtu '
      _files.push(filePersetujuanOrtu)
    }
    if (fileBukuTabungan) {
      _filesIncluded += 'bukuTabungan '
      _files.push(fileBukuTabungan)
    }
    if (fileBuktiTransfer) {
      _filesIncluded += 'buktiTransfer '
      _files.push(fileBuktiTransfer)
    }
    const formData = new FormData()
    let _data = JSON.stringify(buildData())
    formData.append('data', _data)
    formData.append('filesattached', _filesIncluded)
    _files.forEach((i) => formData.append('files', i))
    return formData
  }

  const buildData = () => {
    let data = {
      email,
      nama,
      jalan,
      rtrw,
      no,
      propinsi,
      kabupaten: kabupaten.kabupaten,
      kecamatan: kecamatan.kecamatan,
      kelurahan,
      kodearea,
      agama,
      warganegara,
      nohp,
      noktp,
      nokk,
      nosim,
      nonpwp,
      nobpjs,
      jeniskelamin,
      namaayah,
      namaibu,
      namagadisibu,
      kltdkserumahnama,
      kltdkserumahnohp,
      pendidikan,
      pengalamanbidang,
      pengalamanlamakerja,
      pengalamanketerangan,
      socmed,
      referalagent,
      lembaga,
      negaratujuan,
      program,
      durasiprogram,
    }
    return data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = myFormData(e)
    const fileHeaders = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Basic ' + authCode,
    }
    try {
      const response = await axios({
        method: 'post',
        url: config.BACKEND_URL + '/registration',
        data: formData,
        headers: fileHeaders,
        withCredentials: true,
      })
      setLoading(false)
      console.log('response')
      console.log(JSON.stringify(response))
      // setAlertMsg('Aplikasi anda sudah dikirim.')
      // setAlertVisible(true)
      toast.success('Data registrasi anda berhasil dikirim', {
        autoClose: false,
        hideProgressBar: true,
        onClose: () => navigate('/regdetail2'),
      })
      setNewreg(false)
    } catch (error) {
      console.log('ada error')
      console.log(JSON.stringify(error))
      // setAlertMsg(error.message)
      setLoading(false)
      // setAlertVisible(true)
      toast.error(error.message)
    }
  }

  return (
    <>
      {regstatus === 'submit' && <Navigate to="/regdetail2" />}
      <CForm onSubmit={handleSubmit}>
        <CCard>
          <CCardHeader>
            <h4 id="traffic" className="card-title mb-0">
              Formulir Pendaftaran
            </h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="email1" className="col-sm-3 col-form-label">
                        Email:
                      </CFormLabel>
                      <CCol sm={8}>
                        <CFormInput
                          size="lg"
                          type="text"
                          autoComplete="false"
                          id="email1"
                          plainText
                          value={email}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="nama" className="col-sm-3 col-form-label">
                        Nama Lengkap:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nama"
                          required
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="jeniskelamin" className="col-sm-3 col-form-label">
                        Jenis Kelamin:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="jeniskelamin"
                          required
                          value={jeniskelamin}
                          onChange={(e) => setJeniskelamin(e.target.value)}
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="lakilaki">Laki-laki</option>
                          <option value="perempuan">Perempuan</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="agama" className="col-sm-3 col-form-label">
                        Agama
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          aria-label="Default select example"
                          id="agama"
                          required
                          value={agama}
                          onChange={(e) => setAgama(e.target.value)}
                        >
                          <option value="">Pilih Agama</option>
                          <option value="islam">Islam</option>
                          <option value="katolik">Katolik</option>
                          <option value="protestan">Protestan</option>
                          <option value="budha">Budha</option>
                          <option value="hindu">Hindu</option>
                          <option value="konghucu">KongHuCu</option>
                          <option value="others">Lainnya</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="warganegara" className="col-sm-3 col-form-label">
                        Warga Negara
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="warganegara"
                          required
                          value={warganegara}
                          onChange={(e) => setWarganegara(e.target.value)}
                        >
                          <option value="">Pilih Kewarganegaraan</option>
                          <option value="wni">WNI</option>
                          <option value="wna">WNA</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="pendidikan" className="col-sm-3 col-form-label">
                        Pendidikan Terakhir:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="pendidikan"
                          value={pendidikan}
                          required
                          onChange={(e) => setPendidikan(e.target.value)}
                        >
                          <option value="">Pilih Pendidikan</option>
                          <option value="sd">SD</option>
                          <option value="smp">SMP</option>
                          <option value="sma">SMA</option>
                          <option value="s1">S1</option>
                          <option value="s2">S2</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>Alamat</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="jalan" className="col-sm-3 col-form-label">
                        Jalan:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="jalan"
                          required
                          value={jalan}
                          onChange={(e) => setJalan(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="rtrw" className="col-sm-3 col-form-label">
                        RT/RW:
                      </CFormLabel>
                      <CCol sm={3}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="rtrw"
                          required
                          value={rtrw}
                          onChange={(e) => setRtrw(e.target.value)}
                        />
                      </CCol>
                      <CFormLabel htmlFor="no" className="col-sm-2 col-form-label">
                        No:
                      </CFormLabel>
                      <CCol sm={2}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="no"
                          required
                          value={no}
                          onChange={(e) => setNo(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="propinsi" className="col-sm-3 col-form-label">
                        Propinsi:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormSelect
                          size="sm"
                          id="propinsi"
                          value={propinsi}
                          required
                          onChange={handlePropinsiChange}
                        >
                          <option value="">Pilih Propinsi</option>
                          {propinsilist.map((p, key) => (
                            <option key={key} value={p}>
                              {p}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="kabupaten" className="col-sm-3 col-form-label">
                        Kabupaten/Kota:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormSelect
                          size="sm"
                          id="kabupaten"
                          value={kabupaten.kabupaten}
                          required
                          onChange={handleKabupatenChange}
                        >
                          <option value="">Pilih Kabupaten</option>
                          {kabupatenlist.map((p) => (
                            <option key={p.id} data-value={p.id} value={p.kabupaten}>
                              {p.kabupaten}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="kecamatan" className="col-sm-3 col-form-label">
                        Kecamatan:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormSelect
                          size="sm"
                          id="kecamatan"
                          value={kecamatan.kecamatan}
                          required
                          onChange={handleKecamatanChange}
                        >
                          <option value="">Pilih Kecamatan</option>
                          {kecamatanlist.map((p) => (
                            <option key={p.id} data-value={p.id} value={p.kecamatan}>
                              {p.kecamatan}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="kelurahan" className="col-sm-3 col-form-label">
                        Kelurahan:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormSelect
                          size="sm"
                          id="kelurahan"
                          value={kelurahan}
                          required
                          onChange={(e) => setKelurahan(e.target.value)}
                        >
                          <option value="">Pilih Kelurahan</option>
                          {kelurahanlist.map((p) => (
                            <option key={p.id} value={p.kelurahan}>
                              {p.kelurahan}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="kodearea" className="col-sm-3 col-form-label">
                        Kode Area:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="kodearea"
                          value={kodearea}
                          required
                          onChange={(e) => setKodearea(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>No Identitas</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="nohp" className="col-sm-3 col-form-label">
                        No. HP:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nohp"
                          required
                          value={nohp}
                          onChange={(e) => setNohp(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="noktp" className="col-sm-3 col-form-label">
                        No. KTP:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="noktp"
                          required
                          value={noktp}
                          onChange={(e) => setNoktp(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="nokk" className="col-sm-3 col-form-label">
                        No. KK:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nokk"
                          required
                          value={nokk}
                          onChange={(e) => setNokk(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="nosim" className="col-sm-3 col-form-label">
                        No. SIM:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nosim"
                          value={nosim}
                          onChange={(e) => setNosim(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="nonpwp" className="col-sm-3 col-form-label">
                        No. NPWP:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nonpwp"
                          required
                          value={nonpwp}
                          onChange={(e) => setNonpwp(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="nobpjs" className="col-sm-3 col-form-label">
                        No. BPJS:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="nobpjs"
                          required
                          value={nobpjs}
                          onChange={(e) => setNobpjs(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                        Akun Media Social (jika ada):
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="socmed"
                          value={socmed}
                          onChange={(e) => setSocmed(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>Keluarga</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="namaayah" className="col-sm-4 col-form-label">
                        Nama Ayah:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="namaayah"
                          required
                          value={namaayah}
                          onChange={(e) => setNamaayah(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="namaibu" className="col-sm-4 col-form-label">
                        Nama Ibu:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="namaibu"
                          required
                          value={namaibu}
                          onChange={(e) => setNamaibu(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="namagadisibu" className="col-sm-4 col-form-label">
                        Nama Gadis Ibu Kandung:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="namagadisibu"
                          onChange={(e) => setNamagadisibu(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CCardSubtitle>Keluarga Tidak Serumah</CCardSubtitle>
                    <CRow>
                      <CFormLabel htmlFor="namakeltdkserumah" className="col-sm-4 col-form-label">
                        Nama:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="namakeltdkserumah"
                          required
                          value={kltdkserumahnama}
                          onChange={(e) => setKltdkserumahnama(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="namakeltdknohp" className="col-sm-4 col-form-label">
                        No. HP/Telp:
                      </CFormLabel>
                      <CCol sm={5}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="namakeltdknohp"
                          required
                          value={kltdkserumahnohp}
                          onChange={(e) => setKltdkserumahnohp(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>Pengalaman Kerja</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="bidang" className="col-sm-3 col-form-label">
                        Bidang:
                      </CFormLabel>
                      <CCol sm={6}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="bidang"
                          value={pengalamanbidang}
                          onChange={(e) => setPengalamanbidang(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="lamakerja" className="col-sm-3 col-form-label">
                        Lama Kerja:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="lamakerja"
                          value={pengalamanlamakerja}
                          onChange={(e) => setPengalamanlamakerja(e.target.value)}
                        >
                          <option value="">Pilih Lama kerja</option>
                          <option value="dibawah-satu-thn">dibawah 1 tahun</option>
                          <option value="antara-1-3-thn">1 - 3 tahun</option>
                          <option value="diatas-3-thn">diatas 3 tahun</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="keterangan" className="col-sm-3 col-form-label">
                        Keterangan Lainnya:
                      </CFormLabel>
                      <CCol sm={6}>
                        <CFormInput
                          size="sm"
                          type="text"
                          id="keterangan"
                          value={pengalamanketerangan}
                          onChange={(e) => setPengalamanketerangan(e.target.value)}
                        />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>Program</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="negaratujuan" className="col-sm-4 col-form-label">
                        Negara Tujuan:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="negaratujuan"
                          required
                          value={negaratujuan}
                          onChange={(e) => setNegaratujuan(e.target.value)}
                        >
                          <option value="">Pilih negara</option>
                          <option value="jepang">Jepang</option>
                          <option value="korea">Korea</option>
                          <option value="taiwan">Taiwan</option>
                          <option value="australia">Australia</option>
                          <option value="polandia">Polandia</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="socmed" className="col-sm-4 col-form-label">
                        Program Kerja:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="program"
                          value={program}
                          required
                          onChange={(e) => setProgram(e.target.value)}
                        >
                          <option value="">Pilih Program</option>
                          <option value="SSW">Special Skilled Worker</option>
                          <option value="TG">Tokutei Ginou</option>
                          <option value="GK">Ginou Kenshusei</option>
                          <option value="GJ">Ginou Jisshusei</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CFormLabel htmlFor="socmed" className="col-sm-4 col-form-label">
                        Lama Program Kerja:
                      </CFormLabel>
                      <CCol sm={4}>
                        <CFormSelect
                          size="sm"
                          id="durasiprogram"
                          value={durasiprogram}
                          required
                          onChange={(e) => setDurasiprogram(e.target.value)}
                        >
                          <option value="">Pilih Durasi</option>
                          <option value="1">1 tahun</option>
                          <option value="2">2 tahun</option>
                          <option value="3">3 tahun</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={6}>
                <CCard className="mb-3">
                  <CCardBody>
                    <CCardTitle>Institusi</CCardTitle>
                    <CRow>
                      <CFormLabel htmlFor="referalagent" className="col-sm-3 col-form-label">
                        Nama Agent:
                      </CFormLabel>
                      <CCol sm={7}>
                        <CFormInput
                          size="sm"
                          type="text"
                          value={referalagent}
                          id="referalagent"
                          onChange={(e) => setReferalagent(e.target.value)}
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
                        {/* <CFormInput
                          size="sm"
                          type="text"
                          disable="true"
                          value={referalgroupperusahaan}
                          id="referalgroupperusahaan"
                          // onChange={(e) => setReferalgroupperusahaan(e.target.value)}
                        /> */}
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Dokumen Pendukung</CCardTitle>
                    <CRow>
                      <CCol>
                        <CRow className="mt-3">
                          <CFormLabel htmlFor="photo" className="col-sm-3 col-form-label">
                            Pas Photo:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              required
                              id="photo"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="ktp" className="col-sm-3 col-form-label">
                            KTP:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="ktp"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sim" className="col-sm-3 col-form-label">
                            SIM:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sim"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="kk" className="col-sm-3 col-form-label">
                            Kartu Keluarga:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="kk"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="passport" className="col-sm-3 col-form-label">
                            Passport:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="passport"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="aktelahir" className="col-sm-3 col-form-label">
                            Akte Lahir:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="aktelahir"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="npwp" className="col-sm-3 col-form-label">
                            NPWP:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="npwp"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="bpjs" className="col-sm-3 col-form-label">
                            BPJS Tenaga Kerja:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="bpjs"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="skck" className="col-sm-3 col-form-label">
                            SKCK:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="skck"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="mcu" className="col-sm-3 col-form-label">
                            MCU:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="mcu"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="ijazah" className="col-sm-3 col-form-label">
                            Ijazah:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="ijazah"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol>
                        <CRow>
                          <CFormLabel htmlFor="sertIelt" className="col-sm-3 col-form-label">
                            Sertifikat Ielt:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertIelt"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertN4" className="col-sm-3 col-form-label">
                            Sertifikat N4:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertN4"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertJlft" className="col-sm-3 col-form-label">
                            Sertifikat JLFT:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertJlft"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertJft" className="col-sm-3 col-form-label">
                            Sertifikat JFT:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertJft"
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="persetujuanOrtu" className="col-sm-4 col-form-label">
                            Persetujuan Orangtua/Saudara:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="persetujuanOrtu"
                              required
                              onChange={handleFileChanges}
                            />
                            <CButton
                              size="sm"
                              component="a"
                              color="link"
                              className="px-0"
                              href="izinortu.docx"
                            >
                              <em>download sample</em>
                            </CButton>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertvaksin1" className="col-sm-4 col-form-label">
                            Sertifat Vaksin 1:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertvaksin1"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertvaksin2" className="col-sm-4 col-form-label">
                            Sertifat Vaksin 2:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertvaksin2"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="sertbooster" className="col-sm-4 col-form-label">
                            Sertifat Booster:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="sertbooster"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="bukuTabungan" className="col-sm-4 col-form-label">
                            Buku Tabungan:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="bukuTabungan"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CFormLabel htmlFor="buktiTransfer" className="col-sm-4 col-form-label">
                            Bukti Transfer:
                          </CFormLabel>
                          <CCol sm={6}>
                            <CFormInput
                              size="sm"
                              type="file"
                              id="buktiTransfer"
                              required
                              onChange={handleFileChanges}
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <em>Bank Tujuan: BCA</em>
                          <br />
                          <em>No Rekening Tujuan: 8840886060</em>
                          <br />
                          <em>Nama Tujuan: PT MULTI BISNIS EMLIKU</em>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow className="mt-4">
              <CFormCheck
                id="disclaimer"
                required
                onChange={() => setDisclaimer(!disclaimer)}
                label="Disclaimer: Bahwa saya dengan mengisi data formular pendaftaran diatas diisi dengan sebenar-benarnya dan menyetujui untuk digunakan sebagai syarat kelengkapan program ini dan digunakan untuk Analisa
  Serta  kebutuhan program penunjang lainnya"
              />
            </CRow>
          </CCardBody>
          <CFooter>
            <CRow>
              <CButton type="submit" disabled={loading || !newreg}>
                {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                Submit Formulir
              </CButton>
            </CRow>
          </CFooter>
        </CCard>
      </CForm>
    </>
  )
}

// Registration.propTypes = {
//   email: PropTypes.string,
// }

export default RegistrationEntry
