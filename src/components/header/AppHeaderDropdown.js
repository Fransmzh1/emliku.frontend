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
  // const [loginfo, setLoginfo] = useState()
  const [username, setUsername] = useState()
  const [authcode, setAuthcode] = useState()
  const [usertype, setUsertype] = useState()
  let navigate = useNavigate()

  const loginlogout = async () => {
    // console.log('halo ' + JSON.stringify(loginfo))
    if (authcode) {
      try {
        await axios({
          method: 'get',
          url: config.BACKEND_URL + '/usermgmt/logout',
          headers: { Authorization: 'Basic ' + authcode },
          withCredentials: true,
        })
        console.log('Logout backend Sukses')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userType')
        sessionStorage.removeItem('authCode')
        setUsername()
        setAuthcode()
        setUsertype()
        // setLoginfo()
      } catch (error) {
        console.log(error)
      }
      navigate('/compro', { replace: true })
    } else {
      navigate('/login', { replace: true })
    }
  }

  const handleOnShow = () => {
    setUsername(sessionStorage.getItem('username'))
    setAuthcode(sessionStorage.getItem('authCode'))
    setUsertype(sessionStorage.getItem('userType'))
    // setLoginfo(JSON.parse(sessionStorage.getItem('loginfo')))
  }

  return (
    <CDropdown variant="nav-item" onShow={handleOnShow}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={admin} size="sm" />
        Admin
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {username ? username : 'Belum login'}
        </CDropdownHeader>
        <CDropdownItem component="button" onClick={loginlogout}>
          <CIcon icon={cilUser} className="me-2" />
          {username ? 'Logout' : 'Login'}
        </CDropdownItem>
        {username && (
          <>
            <CDropdownItem component="button">
              <CNavLink to="/resetpasswd" component={NavLink}>
                <CIcon icon={cilSettings} className="me-2" />
                Ubah Password
              </CNavLink>
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
        {authcode && usertype === 'admin' && (
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
