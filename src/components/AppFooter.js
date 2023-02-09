import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://edujobs.id" target="_blank" rel="noopener noreferrer">
          EMLIKU
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
