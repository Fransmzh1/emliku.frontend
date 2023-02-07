import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

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
  CAlert,
  CFormCheck,
} from '@coreui/react'
import config from 'src/config.js'

// import { fileList } from './filelist.js'

const Registration = (email) => {
  const [info, setInfo] = useState({
    nama: '',
    jalan: '',
    rtrw: '',
    no: '',
    propinsi: '',
    kecamatan: '',
    kelurahan: '',
    kodearea: '',
    agama: '',
    warganegara: '',
    nohp: '',
    noktp: '',
    nokk: '',
    nosim: '',
    nonpwp: '',
    nobpjs: '',
    email: email.email,
    jeniskelamin: '',
    namaayah: '',
    namaibu: '',
    namagadisibu: '',
    kltdkserumahnama: '',
    kltdkserumahnohp: '',
    pendidikan: '',
    pengalamanbidang: '',
    pengalamanlamakerja: '',
    pengalamanketerangan: '',
    socmed: '',
    referalagent: '',
    referalgroupperusahaan: '',
    negaratujuan: '',
    program: '',
    durasiprogram: '',
    buktitransferbank: '',
    buktitransfernorek: '',
    buktitransfernama: '',
  })

  const [filePhoto, setFilePhoto] = useState()
  const [fileKtp, setFileKtp] = useState()
  const [filePassport, setFilePassport] = useState()
  const [fileSim, setFileSim] = useState()
  const [fileKk, setFileKk] = useState()
  const [fileNpwp, setFileNpwp] = useState()
  const [fileBpjs, setFileBpjs] = useState()
  const [fileSkck, setFileSkck] = useState()
  const [fileMcu, setFileMcu] = useState()
  const [fileIjazah, setFileIjazah] = useState()
  const [fileSertIelt, setFileSertIelt] = useState()
  const [fileSertN4, setFileSertN4] = useState()
  const [fileSertJft, setFileSertJft] = useState()
  const [fileSertJlft, setFileSertJlft] = useState()
  const [filePersetujuanOrtu, setFilePersetujuanOrtu] = useState()
  const [fileBuktiTransfer, setFileBuktiTransfer] = useState()
  const [fileSertVaksin2, setFileSertVaksin2] = useState()

  const [disclaimer, setDisclaimer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  const backendClient = axios.create({
    baseURL: config.BACKEND_URL,
  })

  const handleInfoChange = (e) => {
    let r = info
    if (e.target.id === 'nama') {
      r.nama = e.target.value
    } else if (e.target.id === 'jalan') {
      r.jalan = e.target.value
    } else if (e.target.id === 'rtrw') {
      r.rtrw = e.target.value
    } else if (e.target.id === 'no') {
      r.no = e.target.value
    } else if (e.target.id === 'propinsi') {
      r.propinsi = e.target.value
    } else if (e.target.id === 'kecamatan') {
      r.kecamatan = e.target.value
    } else if (e.target.id === 'kelurahan') {
      r.kelurahan = e.target.value
    } else if (e.target.id === 'kodearea') {
      r.kodearea = e.target.value
    } else if (e.target.id === 'agama') {
      r.agama = e.target.value
    } else if (e.target.id === 'warganegara') {
      r.warganegara = e.target.value
    } else if (e.target.id === 'nohp') {
      r.nohp = e.target.value
    } else if (e.target.id === 'noktp') {
      r.noktp = e.target.value
    } else if (e.target.id === 'nokk') {
      r.nokk = e.target.value
    } else if (e.target.id === 'nosim') {
      r.nosim = e.target.value
    } else if (e.target.id === 'nonpwp') {
      r.nonpwp = e.target.value
    } else if (e.target.id === 'nobpjs') {
      r.nobpjs = e.target.value
    } else if (e.target.id === 'email') {
      r.email = e.target.value
    } else if (e.target.id === 'jeniskelamin') {
      r.jeniskelamin = e.target.value
    } else if (e.target.id === 'namaayah') {
      r.namaayah = e.target.value
    } else if (e.target.id === 'namaibu') {
      r.namaibu = e.target.value
    } else if (e.target.id === 'namagadisibu') {
      r.namagadisibu = e.target.value
    } else if (e.target.id === 'namakeltdkserumah') {
      r.kltdkserumahnama = e.target.value
    } else if (e.target.id === 'namakeltdknohp') {
      r.kltdkserumahnohp = e.target.value
    } else if (e.target.id === 'pendidikan') {
      r.pendidikan = e.target.value
    } else if (e.target.id === 'bidang') {
      r.pengalamanbidang = e.target.value
    } else if (e.target.id === 'lamakerja') {
      r.pengalamanlamakerja = e.target.value
    } else if (e.target.id === 'keterangan') {
      r.pengalamanketerangan = e.target.value
    } else if (e.target.id === 'socmed') {
      r.socmed = e.target.value
    } else if (e.target.id === 'referalagent') {
      r.referalagent = e.target.value
    } else if (e.target.id === 'referalgroupperusahaan') {
      r.referalgroupperusahaan = e.target.value
    } else if (e.target.id === 'negaratujuan') {
      r.negaratujuan = e.target.value
    } else if (e.target.id === 'program') {
      r.program = e.target.value
    } else if (e.target.id === 'durasiprogram') {
      r.durasiprogram = e.target.value
    } else if (e.target.id === 'disclaimer') {
      setDisclaimer(!disclaimer)
    }
    setInfo(r)
  }

  const handleFileChanges = (e) => {
    console.log('Change file ')
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
    } else if (e.target.id === 'sertvaksin2') {
      setFileSertVaksin2(e.target.files[0])
    } else if (e.target.id === 'buktiTransfer') {
      setFileBuktiTransfer(e.target.files[0])
    }
  }

  const myFormData = (e) => {
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
    if (fileSertVaksin2) {
      _filesIncluded += 'vaksin2 '
      _files.push(fileSertVaksin2)
    }
    if (filePersetujuanOrtu) {
      _filesIncluded += 'persetujuanOrtu '
      _files.push(filePersetujuanOrtu)
    }
    if (fileBuktiTransfer) {
      _filesIncluded += 'buktiTransfer '
      _files.push(fileBuktiTransfer)
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(info))
    formData.append('filesattached', _filesIncluded)
    _files.forEach((i) => formData.append('files', i))
    return formData
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!disclaimer) {
      setErrorMsg('Checkbox Disclaimer harus diisi dulu')
      setAlertVisible(true)
      return
    }
    setLoading(true)
    const formData = myFormData(e)
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    const fileHeaders = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Basic ' + _loginfo.basic,
    }
    try {
      const response = await backendClient({
        method: 'post',
        url: '/registration',
        data: formData,
        headers: fileHeaders,
      })
      setLoading(false)
      console.log(response)
      setInfo({})
      setAlertVisible(true)
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)
      setLoading(false)
      setAlertVisible(true)
    }
  }

  // useEffect(() => {
  //   // let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
  //   console.log('email ' + email)
  //   let r = info
  //   // r.email = _loginfo.email
  //   // info.email = _loginfo.email
  // }, [])

  return (
    <>
      <CForm onSubmit={handleSubmit}>
        <CCard>
          <CCardHeader>
            <h4 id="traffic" className="card-title mb-0">
              Formulir Pendaftaran
            </h4>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CCol xs={3}>
                <h5>Email:</h5>
              </CCol>
              <CCol>
                <h5>{email.email}</h5>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={7}>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="nama" className="col-sm-3 col-form-label">
                    Nama Lengkap:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="nama" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <p>Alamat:</p>
                  <CFormLabel htmlFor="jalan" className="col-sm-3 col-form-label">
                    Jalan:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="jalan" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="rtrw" className="col-sm-3 col-form-label">
                    RT/RW:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="rtrw" onChange={handleInfoChange} />
                  </CCol>
                  <CFormLabel htmlFor="no" className="col-sm-1 col-form-label">
                    No:
                  </CFormLabel>
                  <CCol sm={2}>
                    <CFormInput size="sm" type="text" id="no" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="propinsi" className="col-sm-3 col-form-label">
                    Propinsi:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="propinsi" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="kecamatan" className="col-sm-3 col-form-label">
                    Kecamatan:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="kecamatan" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="kelurahan" className="col-sm-3 col-form-label">
                    Kelurahan:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="kelurahan" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="kodearea" className="col-sm-3 col-form-label">
                    Kode Area:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="kodearea" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="agama" className="col-sm-3 col-form-label">
                    Agama
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormSelect
                      size="sm"
                      aria-label="Default select example"
                      id="agama"
                      onChange={handleInfoChange}
                    >
                      <option value="">Pilih Agama</option>
                      <option value="islam">Islam</option>
                      <option value="kristen">Kristen</option>
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
                  <CCol sm={3}>
                    <CFormSelect size="sm" id="warganegara" onChange={handleInfoChange}>
                      <option value="">Pilih Kewarganegaraan</option>
                      <option value="wni">WNI</option>
                      <option value="wna">WNA</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="nohp" className="col-sm-3 col-form-label">
                    No. HP:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="nohp" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="noktp" className="col-sm-3 col-form-label">
                    No. KTP:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="noktp" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="nokk" className="col-sm-3 col-form-label">
                    No. KK:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="nokk" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="nosim" className="col-sm-3 col-form-label">
                    No. SIM:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="nosim" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="nonpwp" className="col-sm-3 col-form-label">
                    No. NPWP:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="nonpwp" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="nobpjs" className="col-sm-3 col-form-label">
                    No. BPJS:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput size="sm" type="text" id="nobpjs" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="jeniskelamin" className="col-sm-3 col-form-label">
                    Jenis Kelamin:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormSelect size="sm" id="jeniskelamin" onChange={handleInfoChange}>
                      <option>Pilih Jenis Kelamin</option>
                      <option value="lakilaki">Laki-laki</option>
                      <option value="perempuan">Perempuan</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="namaayah" className="col-sm-3 col-form-label">
                    Nama Ayah:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="namaayah" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="namaibu" className="col-sm-3 col-form-label">
                    Nama Ibu:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="namaibu" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="namagadisibu" className="col-sm-3 col-form-label">
                    Nama Gadis Ibu Kandung:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="namagadisibu"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
                <p>Keluarga Tidak Serumah</p>
                <CRow>
                  <CFormLabel htmlFor="namakeltdkserumah" className="col-sm-3 col-form-label">
                    Nama:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="namakeltdkserumah"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="namakeltdknohp" className="col-sm-3 col-form-label">
                    No. HP/Telp:
                  </CFormLabel>
                  <CCol sm={4}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="namakeltdknohp"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="pendidikan" className="col-sm-3 col-form-label">
                    Pendidikan Terakhir:
                  </CFormLabel>
                  <CCol sm={4}>
                    <CFormInput size="sm" type="text" id="pendidikan" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <p>Pengalaman Kerja</p>
                <CRow>
                  <CFormLabel htmlFor="bidang" className="col-sm-3 col-form-label">
                    Bidang:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="bidang" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="lamakerja" className="col-sm-3 col-form-label">
                    Lama Kerja:
                  </CFormLabel>
                  <CCol sm={4}>
                    <CFormInput size="sm" type="text" id="lamakerja" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="keterangan" className="col-sm-3 col-form-label">
                    Keterangan Lainnya:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="keterangan" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                    Akun Media Social (jika ada):
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="text" id="socmed" onChange={handleInfoChange} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                    Referal Agent:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="referalagent"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                    Group Perusahaan:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="referalgroupperusahaan"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="negaratujuan" className="col-sm-3 col-form-label">
                    Negara Tujuan:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormSelect size="sm" id="negaratujuan" onChange={handleInfoChange}>
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
                  <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                    Program Kerja:
                  </CFormLabel>
                  <CCol sm={3}>
                    {/* <CFormInput size="sm" type="text" id="program" onChange={handleInfoChange} /> */}
                    <CFormSelect size="sm" id="program" onChange={handleInfoChange}>
                      <option value="">Pilih Program</option>
                      <option value="SSW">Special Skilled Worker</option>
                      <option value="TG">Tokutei Ginou</option>
                      <option value="GK">Ginou Kenshusei</option>
                      <option value="GJ">Ginou Jisshusei</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="socmed" className="col-sm-3 col-form-label">
                    Lama Program Kerja:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormSelect size="sm" id="durasiprogram" onChange={handleInfoChange}>
                      <option value="">Pilih Durasi</option>
                      <option value="1">1 tahun</option>
                      <option value="2">2 tahun</option>
                      <option value="3">3 tahun</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CCol>
              <CCol>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="photo" className="col-sm-3 col-form-label">
                    Pas Photo:
                  </CFormLabel>
                  <CCol sm={5}>
                    <CFormInput size="sm" type="file" id="photo" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="ktp" className="col-sm-3 col-form-label">
                    KTP:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="ktp" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="sim" className="col-sm-3 col-form-label">
                    SIM:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="sim" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="kk" className="col-sm-3 col-form-label">
                    Kartu Keluarga:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="kk" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="passport" className="col-sm-3 col-form-label">
                    Passport:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="passport" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="npwp" className="col-sm-3 col-form-label">
                    NPWP:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="npwp" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="bpjs" className="col-sm-3 col-form-label">
                    BPJS Tenaga Kerja:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="bpjs" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="skck" className="col-sm-3 col-form-label">
                    SKCK:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="skck" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="mcu" className="col-sm-3 col-form-label">
                    MCU:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="mcu" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="ijazah" className="col-sm-3 col-form-label">
                    Ijazah:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="ijazah" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="sertIelt" className="col-sm-3 col-form-label">
                    Sertifikat Ielt:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="sertIelt" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="sertN4" className="col-sm-3 col-form-label">
                    Sertifikat N4:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="sertN4" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="sertJlft" className="col-sm-3 col-form-label">
                    Sertifikat JLFT:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="sertJlft" onChange={handleFileChanges} />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="sertJft" className="col-sm-3 col-form-label">
                    Sertifikat JFT:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput size="sm" type="file" id="sertJft" onChange={handleFileChanges} />
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
                      onChange={handleFileChanges}
                    />
                    <CButton
                      size="sm"
                      component="a"
                      color="link"
                      className="px-0"
                      href="pernyataan.docx"
                    >
                      <em>download sample</em>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="buktiTransfer" className="col-sm-4 col-form-label">
                    Sertifat Vaksin 2:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="file"
                      id="sertvaksin2"
                      onChange={handleFileChanges}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="buktiTransfer" className="col-sm-4 col-form-label">
                    Bukti Transfer:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="file"
                      id="buktiTransfer"
                      onChange={handleFileChanges}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="buktitransferbank" className="col-sm-3 col-form-label">
                    Nama Bank:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormSelect
                      size="sm"
                      id="buktitransferbank"
                      onChange={handleInfoChange}
                      defaultValue="BCA"
                    >
                      <option value="BCA">BCA</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CFormLabel htmlFor="buktitransfernorek" className="col-sm-3 col-form-label">
                    No Rekening:
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormInput
                      size="sm"
                      type="text"
                      id="buktitransfernorek"
                      onChange={handleInfoChange}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="mt-4">
              <CFormCheck
                id="disclaimer"
                onChange={handleInfoChange}
                label="Disclaimer: Bahwa saya dengan mengisi data formular pendaftaran diatas diisi dengan sebenar-benarnya dan menyetujui untuk digunakan sebagai syarat kelengkapan program ini dan digunakan untuk Analisa
Serta  kebutuhan program penunjang lainnya"
              />
            </CRow>
          </CCardBody>
          <CFooter>
            <CRow>
              <CButton type="submit" disabled={loading}>
                {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                Submit Formulir
              </CButton>
              {alertVisible && (
                <CAlert
                  color={errorMsg ? 'danger' : 'primary'}
                  dismissible
                  visible={alertVisible}
                  onClose={() => setAlertVisible(false)}
                >
                  {errorMsg ? errorMsg : 'Submit informasi berhasil!'}
                </CAlert>
              )}
            </CRow>
          </CFooter>
        </CCard>
      </CForm>
    </>
  )
}

Registration.propTypes = {
  email: PropTypes.string,
}

export default Registration
