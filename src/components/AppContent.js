import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import ProtectedRoute from 'src/layout/ProtectedRoute'

const Registration = React.lazy(() => import('../views/registration/Registration'))
const UserForm = React.lazy(() => import('../views/usermgmt/UserForm'))
const UserList = React.lazy(() => import('../views/usermgmt/UserList'))
const Compro = React.lazy(() => import('../views/dashboard/Compro'))
const Program = React.lazy(() => import('../views/dashboard/Program'))
const Syarat = React.lazy(() => import('../views/dashboard/Syarat'))
const RegistrationList = React.lazy(() => import('../views/registration/RegistrationList'))
const RegistrationDetail = React.lazy(() => import('../views/registration/RegistrationDetail'))
const Login = React.lazy(() => import('../views/usermgmt/Login'))
const ResetPassword = React.lazy(() => import('../views/usermgmt/ResetPassword'))
// const Register = React.lazy(() => import('../views/pages/login/Register'))

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="compro" replace />} />
          <Route path="/compro" name="Compro" element={<Compro />} />
          <Route path="/program" exact name="Program" element={<Program />} />
          <Route path="/term" exact name="Program" element={<Syarat />} />
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/resetpasswd" exact name="ResetPassword" element={<ResetPassword />} />
          {/* <Route path="/register" name="Register Page" element={<Register />} /> */}
          <Route path="/registration" exact name="Registration" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/registrationlist"
              exact
              name="RegistrationList"
              element={<RegistrationList />}
            />
            <Route
              path="/regdetail"
              exact
              name="RegistrationDetail"
              element={<RegistrationDetail />}
            />
            <Route path="/userlist" exact name="UserList" element={<UserList />} />
            <Route path="/userform" exact name="UserForm" element={<UserForm />} />
          </Route>
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
