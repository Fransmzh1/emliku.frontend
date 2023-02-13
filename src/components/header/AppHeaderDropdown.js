import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from '@coreui/react'
import { cilCreditCard, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink, useNavigate } from 'react-router-dom'

import admin from './../../assets/icons/admin_user_icon.png'

const AppHeaderDropdown = () => {
  const [loggedAccount, setLoggedAccount] = useState('')
  let navigate = useNavigate()

  const loginlogout = () => {
    if (loggedAccount) {
      console.log('akan logout')
      sessionStorage.removeItem('loginfo')
      navigate('/compro', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }

  const handleOnShow = () => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    setLoggedAccount(_loginfo ? _loginfo.email : null)
  }

  return (
    <CDropdown variant="nav-item" onShow={handleOnShow}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={admin} size="sm" />
        Admin
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {loggedAccount ? loggedAccount : 'Belum login'}
        </CDropdownHeader>
        <CDropdownItem component="button" onClick={loginlogout}>
          <CIcon icon={cilUser} className="me-2" />
          {loggedAccount ? 'Logout' : 'Login'}
        </CDropdownItem>
        {loggedAccount && (
          <>
            <CDropdownItem component="button">
              <CNavLink to="/registrationlist" component={NavLink}>
                <CIcon icon={cilSettings} className="me-2" />
                Registration List
              </CNavLink>
            </CDropdownItem>
            <CDropdownItem component="button">
              <CNavLink to="/userform" component={NavLink}>
                <CIcon icon={cilCreditCard} className="me-2" />
                User Mgmt
              </CNavLink>
            </CDropdownItem>
          </>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
