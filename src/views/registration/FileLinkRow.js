import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import config from 'src/config.js'
import PropTypes from 'prop-types'

const FileLinkRow = ({ email, ft, attachments }) => {
  const _fname = attachments.filter((m) => m.fileType === ft.filetype)
  const fname = _fname.length > 0 ? _fname[0].fileName : null

  const downloadFile = async () => {
    console.log('akan download')
    try {
      const response = await axios({
        method: 'get',
        url: config.BACKEND_URL + '/download/file/' + ft.filetype + '?email=' + email,
        headers: { Authorization: 'Basic ' + sessionStorage.getItem('authCode') },
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fname) // nama file dan extension sesuaikan dengan file yang di download
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
      console.log('done download ' + ft.filetype)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CRow>
      <CCol sm={4}>File {ft.label}:</CCol>
      <CCol sm={6}>
        {fname && (
          <CButton color="link" onClick={() => downloadFile()}>
            {fname}
          </CButton>
        )}
        {!fname && (
          <CButton color="link" disabled>
            [ tidak ada file! ]
          </CButton>
        )}
      </CCol>
    </CRow>
  )
}

FileLinkRow.propTypes = {
  email: PropTypes.string,
  ft: PropTypes.object,
  attachments: PropTypes.array,
}

export default FileLinkRow
