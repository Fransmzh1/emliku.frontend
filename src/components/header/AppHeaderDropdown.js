import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from '@coreui/react'
import { cilCreditCard, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink, useNavigate } from 'react-router-dom'
import config from 'src/config'

import admin from './../../assets/icons/admin_user_icon.png'
import axios from 'axios'

const AppHeaderDropdown = () => {
  // const [loggedAccount, setLoggedAccount] = useState('')
  const [isAdmin, setIsAdmin] = useState('false')
  const [loginfo, setLoginfo] = useState()
  let navigate = useNavigate()

  const loginlogout = async () => {
    console.log('halo ' + JSON.stringify(loginfo))
    if (loginfo) {
      try {
        await axios({
          method: 'get',
          url: config.BACKEND_URL + '/usermgmt/logout',
          headers: { Authorization: 'Basic ' + loginfo.basic },
          withCredentials: true,
        })
        console.log('Logout backend Sukses')
        sessionStorage.removeItem('loginfo')
        setLoginfo()
      } catch (error) {
        console.log(error)
      }
      navigate('/compro', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
    // if (loggedAccount) {
    //   console.log('akan logout')
    //   sessionStorage.removeItem('loginfo')
    //   navigate('/compro', { replace: true })
    // } else {
    //   navigate('/login', { replace: true })
    // }
  }

  const handleOnShow = () => {
    let _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    console.log('handleOnShow1: ' + JSON.stringify(_loginfo))
    setLoginfo(_loginfo)
    // setLoggedAccount(loginfo ? loginfo.email : null)
    setIsAdmin(loginfo ? loginfo.admin : 'false')
  }

  return (
    <CDropdown variant="nav-item" onShow={handleOnShow}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={admin} size="sm" />
        Admin
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {loginfo ? loginfo.email : 'Belum login'}
        </CDropdownHeader>
        <CDropdownItem component="button" onClick={loginlogout}>
          <CIcon icon={cilUser} className="me-2" />
          {loginfo ? 'Logout' : 'Login'}
        </CDropdownItem>
        {loginfo && (
          <>
            <CDropdownItem component="button">
              <CIcon icon={cilSettings} className="me-2" />
              Ubah Password
            </CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem component="button">
              <CNavLink to="/registrationlist" component={NavLink}>
                <CIcon icon={cilSettings} className="me-2" />
                Registration List
              </CNavLink>
            </CDropdownItem>
          </>
        )}
        {loginfo && loginfo.admin === 'true' && (
          <>
            <CDropdownItem component="button">
              <CNavLink to="/userlist" component={NavLink}>
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
