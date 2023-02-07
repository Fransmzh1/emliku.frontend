import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import ProtectedRoute from 'src/layout/ProtectedRoute'

const Registration = React.lazy(() => import('../views/dashboard/Registration'))
const Registration2 = React.lazy(() => import('../views/dashboard/Registration2'))
const Compro = React.lazy(() => import('../views/dashboard/Compro'))
const Program = React.lazy(() => import('../views/dashboard/Program'))
const Syarat = React.lazy(() => import('../views/dashboard/Syarat'))
const RegistrationList = React.lazy(() => import('../views/dashboard/RegistrationList'))

const AppContent = () => {
  const [email, setEmail] = useState('')

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="compro" replace />} />
          <Route path="/compro" name="Compro" element={<Compro />} />
          <Route path="/program" exact name="Program" element={<Program />} />
          <Route path="/term" exact name="Program" element={<Syarat />} />
          <Route
            path="/registration2"
            exact
            name="Registration2"
            element={<Registration2 email={email} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/registration"
              exact
              name="Registration"
              element={<Registration email={email} />}
            />
          </Route>
          <Route
            path="/registrationlist"
            exact
            name="RegistrationList"
            element={<RegistrationList />}
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
