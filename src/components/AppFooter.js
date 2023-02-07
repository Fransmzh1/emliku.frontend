import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          EMSIKU
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
