import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardImage, CCardTitle, CCol, CRow } from '@coreui/react'

import program from 'src/assets/images/program.jpg'

const Program = () => {
  return (
    // <CRow className="justify-content-center">
    //   <CCol xs={8}>
    <CCard>
      <CCardHeader>
        <h4 id="traffic" className="card-title mb-0">
          Program
        </h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3 justify-content-center">
          <CCol md={8}>
            <CCardImage orientation="top" src={program} fluid />
          </CCol>
        </CRow>
        <CRow sm={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
          <CCol sm>
            <CCard>
              <CCardBody>
                <CCardTitle>Negara Tujuan</CCardTitle>
                <ul>
                  <li>Jepang</li>
                  <li>Korea</li>
                  <li>Taiwan</li>
                  <li>Australia</li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm>
            <CCard>
              <CCardBody>
                <CCardTitle>Sektor Pekerjaan Jepang</CCardTitle>
                <ul>
                  <li>Tenaga bidang pertanian (Nougyou)</li>
                  <li>Tenaga bidang pengolahan makanan minuman ( inshokuryohin seizo-gyo)</li>
                  <li>Tenaga bidan keperawatan (kaigo)</li>
                  <li>Tenaga bidang bisnis akomodasi/perhotelan</li>
                  <li>House keeping (kaji daiko)</li>
                  <li>Building maintenance (biru kurininggu)</li>
                  <li>Tenaga bidang konstruksi (kensetsu)</li>
                  <li>Tenaga bidan industri alat & mesin (kogu oyobi kikai sagyo)</li>
                  <li>Automotive</li>
                  <li>Pengelasan (yousetsu)</li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm>
            <CCard>
              <CCardBody>
                <CCardTitle>Program Kerja</CCardTitle>
                <ul>
                  <li>Special Skill worker ( SSW)</li>
                  <li>Tokutei Ginou ( TG )</li>
                  <li>Ginou Kenshusei </li>
                  <li>Ginou Jisshusei</li>
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs>
            <CCard>
              <CCardBody>
                <CCardTitle>Gaji Kerja</CCardTitle>
                Kisaran besaran upah terendah tergantung jenis sector peerjaan dalam rupiah
                Indonesia adalah Rp 17.000.000 s.d Rp. 30.000.000 (status upah bersih setelah
                dipotong pajak dan asuransi) dan belum termasuk upah lembur, tidak termasuk
                kebutuhan makan dan akomodasi
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    //   </CCol>
    // </CRow>
  )
}

export default Program
