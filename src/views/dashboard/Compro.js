import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import img1 from 'src/assets/images/compro1.png'
import img2 from 'src/assets/images/compro2.png'

const Compro = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <CCardTitle>PT EMLIKU SMART TECHNOLOGY</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 justify-content-center">
            <CCol sm={10}>
              <CCardText>
                PT Emliku Smart Technology adalah perusahaan penyedia layanan System Integrator yang
                didirikan pada tahun 2019. PT Emliku Smart Technology merupakan perwakilan resmi
                Taiwan Institute for Information Industry (perusahaan yang bergerak di bidang
                inovasi dan aplikasi teknologi komunikasi informasi di Taiwan, dan untuk membantu
                pengembangan ekonomi digital.
              </CCardText>
            </CCol>
          </CRow>
          <CRow className="mb-3 justify-content-center">
            <CCol lg={4}>
              <CCardImage orientation="top" src={img1} fluid />
            </CCol>
            <CCol lg={6}>
              <CCardImage orientation="top" src={img2} fluid />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Compro
