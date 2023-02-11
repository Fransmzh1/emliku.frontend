import React from 'react'
import { NavLink } from 'react-router-dom'
import { CContainer, CHeader, CHeaderNav, CNavLink, CNavItem, CImage } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilList } from '@coreui/icons'

// import { AppHeaderDropdown } from './header/index'
import lpk from 'src/assets/brand/lpk_emliku.png'

const AppHeader = () => {
  const _loginfo = JSON.parse(sessionStorage.getItem('loginfo'))
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CImage rounded src={lpk} width={70} height={70} />
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/compro" component={NavLink}>
              Profile Company
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/program" component={NavLink}>
              Program
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/registration" component={NavLink}>
              <CIcon icon={cilBell} size="lg" />
              Formulir Registrasi
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/term" component={NavLink}>
              <CIcon icon={cilList} size="lg" />
              Syarat dan Ketentuan
            </CNavLink>
          </CNavItem>
          {_loginfo && _loginfo.admin && _loginfo.admin === 'true' && (
            <CNavItem>
              <CNavLink to="/registrationlist" component={NavLink}>
                <CIcon icon={cilList} size="lg" />
                Registration List
              </CNavLink>
            </CNavItem>
          )}
        </CHeaderNav>
        {/* <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav> */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
