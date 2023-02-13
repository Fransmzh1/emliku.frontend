import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import ProtectedRoute from 'src/layout/ProtectedRoute'

const Registration = React.lazy(() => import('../views/dashboard/Registration'))
const UserForm = React.lazy(() => import('../views/dashboard/UserForm'))
const Compro = React.lazy(() => import('../views/dashboard/Compro'))
const Program = React.lazy(() => import('../views/dashboard/Program'))
const Syarat = React.lazy(() => import('../views/dashboard/Syarat'))
const RegistrationList = React.lazy(() => import('../views/dashboard/RegistrationList'))
const Login = React.lazy(() => import('../views/pages/login/Login'))
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
          {/* <Route path="/register" name="Register Page" element={<Register />} /> */}
          <Route path="/registration" exact name="Registration" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/registrationlist"
              exact
              name="RegistrationList"
              element={<RegistrationList />}
            />
            <Route path="/userform" exact name="UserForm" element={<UserForm />} />
          </Route>
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
