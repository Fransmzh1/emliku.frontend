import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CImage,
  CHeaderDivider,
  CNav,
  CNavbarText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilList,
  cilUser,
  cilUserPlus,
  cilPuzzle,
  cilCheck,
  cibSuperuser,
} from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import lpk from 'src/assets/brand/lpk_emliku.png'

const AppHeader = () => {
  const [admin, setAdmin] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
  const [emailAddr, setEmailAddr] = useState()

  useEffect(() => {
    const _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
    if (_loginfo) {
      setLoggedin(true)
      setEmailAddr(_loginfo.email)
      setAdmin(_loginfo.admin)
    }
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavLink to="/compro" component={NavLink}>
            <CImage rounded src={lpk} width={70} height={70} />
          </CNavLink>
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink to="/compro" component={NavLink}>
              <CIcon icon={cilBuilding} size="lg" />
              Profile Company
            </CNavLink>
          </CNavItem> */}
          <CNavItem>
            <CNavLink to="/program" component={NavLink}>
              <CIcon icon={cilPuzzle} size="lg" />
              Program
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/term" component={NavLink}>
              <CIcon icon={cilCheck} size="lg" />
              Syarat dan Ketentuan
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/registration" component={NavLink}>
              <CIcon icon={cilBell} size="lg" />
              Formulir Registrasi
            </CNavLink>
          </CNavItem>
          {/* {admin && (
            <CNavItem>
              <CNavLink to="/registrationlist" component={NavLink}>
                <CIcon icon={cilList} size="lg" />
                Registration List
              </CNavLink>
            </CNavItem>
          )} */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        {/* <CHeaderDivider />
        <CNavbarText>
          {loggedin ? 'Anda login sebagai ' + emailAddr : 'Login dulu untuk melakukan pendaftaran'}
        </CNavbarText>
        {!loggedin && (
          <CNav variant="pills" className="flex-column flex-sm-row">
            <CNavItem>
              <CNavLink to="/login" component={NavLink}>
                <CIcon icon={cilUser} size="lg" />
                Login
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/register" component={NavLink}>
                <CIcon icon={cilUserPlus} size="lg" />
                Daftar User Baru
              </CNavLink>
            </CNavItem>
          </CNav>
        )} */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
