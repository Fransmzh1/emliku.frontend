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
    <CRow className="justify-content-center">
      <CCol xs={8} className="align-self-center">
        <CCard className="mb-4">
          <CCardHeader>
            <CCardTitle>PT EMLIKU SMART TECHNOLOGY</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              PT Emliku Smart Technology adalah perusahaan penyedia layanan System Integrator yang
              didirikan pada tahun 2019. PT Emliku Smart Technology merupakan perwakilan resmi
              Taiwan Institute for Information Industry (perusahaan yang bergerak di bidang inovasi
              dan aplikasi teknologi komunikasi informasi di Taiwan, dan untuk membantu pengembangan
              ekonomi digital.
            </CCardText>
            <CRow>
              <CCol>
                <CCardImage orientation="top" src={img1} width={70} height={420} />
              </CCol>
              <CCol>
                <CCardImage orientation="top" src={img2} width={70} height={420} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Compro
