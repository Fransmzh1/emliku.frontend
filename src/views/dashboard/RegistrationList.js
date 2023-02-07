import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CRow } from '@coreui/react'

const RegistrationList = () => {
  return (
    <CRow className="justify-content-center">
      <CCol xs={8}>
        <CCard className="mb-6">
          <CCardHeader>
            <CCardTitle>Registration List</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <ul>
              <li>Pria/Wanita usia 18-35 tahun ( magang ), max 45 tahun (SSW/TG) </li>
              <li>Pendidikan minimal lulusan SMK /SMA Sederajat</li>
              <li>Pria/Wanita usia 18-35 tahun ( magang ), max 45 tahun (SSW/TG) </li>
              <li>Tinggi badan minimal , Pria ( 160cm), Wanita ( 150cm)</li>
              <li>Tidak bertato, tindik, buta warna</li>
              <li>
                Tidak mempunyai Riwayat penyakit ( patah tulang/terpasang
                pen,TBC,Diabetes,jantung,Hipertensi, HIV ,liver/hati dan kanker )
              </li>
              <li>Sehat jasmani dan rohani, rajin, gigih</li>
              <li>Memiliki sehat dan mental yang baik</li>
              <li>
                Persyaratan dokumen :
                <ul>
                  <li>Ijazah : SD, SMP,SMA/SMK,D3/SI,</li>
                  <li>Dok : KK,AKTE,KTP,SKCK,MCU,NPWP,BPJS tenaga kerja</li>
                </ul>
              </li>
              <li>Memiliki sertifikat N4, bagi yang belum wajib mengikuti pelatihan</li>
              <li>
                Membayar biaya pelatihan Bahasa jepang selama 4-6 bulan plus ikut test JLFT / JFT
                sebesar Rp. 5.000.000
              </li>
              <li>
                Biaya pelatihan dapat dikembalikan (saat pencairan dana apabila pengajuan dana
                talangan / pembiayaan)
              </li>
              <li>
                Membayar semua biaya sebesar Rp. 50.000.000 terkait program ini yang didalamnya
                sudah termasuk biaya pelatihan.
                <br />
                Adapun biaya tersebut meliputi :
                <ul>
                  <li>Certificate of eligibility ( COE )/ Contract For Job Order ( JO)</li>
                  <li>Visa kerja ( SSW,TG) atau Visa Magang ( GK /GJ )</li>
                  <li>Medical Check Up ( MCU )</li>
                  <li>Tiket Pesawat one way, Indonesia – Jepang</li>
                  <li>
                    Transportasi BUS pemberangkatan ke Airport (Indonesia) & transportasi BUS
                    penjemputan dari airport ke lokasi ( Japan)
                  </li>
                  <li>
                    Uang saku ( selama perjalanan, akomodasi, melas ) untuk 1 bulan pertama kerja di
                    Jepang
                  </li>
                  <li>Asuransi Perjalanan</li>
                </ul>
                <li>
                  Tersedia biaya talangan atau pembiayaan, dengan biaya-biaya tambahan sekitar
                  13-18% per tahun
                </li>
              </li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegistrationList
