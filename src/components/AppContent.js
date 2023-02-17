import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import ProtectedRoute from 'src/layout/ProtectedRoute'
import ProtectedPelamar from 'src/layout/ProtectedPelamar'

// const Registration = React.lazy(() => import('../views/registration/Registration'))
const LoginPelamar = React.lazy(() => import('../views/registration/LoginPelamar'))
const RegistrationList = React.lazy(() => import('../views/registration/RegistrationList'))
const RegistrationDetail = React.lazy(() => import('../views/registration/RegistrationDetail'))
const RegistrationEntry = React.lazy(() => import('../views/registration/RegistrationEntry'))
const RegistrationDetailPelamar = React.lazy(() =>
  import('../views/registration/RegistrationDetail'),
)
const UserForm = React.lazy(() => import('../views/usermgmt/UserForm'))
const UserList = React.lazy(() => import('../views/usermgmt/UserList'))
const ResetPassword = React.lazy(() => import('../views/usermgmt/ResetPassword'))
const Login = React.lazy(() => import('../views/usermgmt/Login'))
const Compro = React.lazy(() => import('../views/dashboard/Compro'))
const Program = React.lazy(() => import('../views/dashboard/Program'))
const Syarat = React.lazy(() => import('../views/dashboard/Syarat'))
// const Register = React.lazy(() => import('../views/pages/login/Register'))

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="compro" replace />} />
          <Route path="/compro" name="Compro" element={<Compro />} />
          <Route path="/program" exact name="Program" element={<Program />} />
          <Route path="/term" exact name="Program" element={<Syarat />} />
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/loginpelamar" name="Login Pelamar" element={<LoginPelamar />} />
          <Route path="/resetpasswd" exact name="ResetPassword" element={<ResetPassword />} />
          <Route element={<ProtectedPelamar />}>
            <Route
              path="/registrationentry"
              exact
              name="Registration Entry"
              element={<RegistrationEntry />}
            />
            <Route
              path="/regdetail2"
              exact
              name="Registration Detail"
              element={<RegistrationDetailPelamar />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/userlist" exact name="UserList" element={<UserList />} />
            <Route
              path="/registrationlist"
              exact
              name="RegistrationList"
              element={<RegistrationList />}
            />
            <Route path="/userform" exact name="UserForm" element={<UserForm />} />
            <Route
              path="/regdetail"
              exact
              name="RegistrationDetail"
              element={<RegistrationDetail />}
            />
          </Route>
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
