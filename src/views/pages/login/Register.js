import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom'

import logo from 'src/assets/brand/lpk_emliku.png'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import config from 'src/config.js'

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  const [emailaddr, setEmailaddr] = useState()
  const [confirmMsg, setConfirmMsg] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const gotoLogin = location.state?.prev ? location.state.prev : '/login'

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    // setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const backendClient = axios.create({
    baseURL: config.BACKEND_URL,
  })

  // const inputIsNotValid = () => {
  //   console.log('validate')
  //   if (!emailaddr.includes('@')) {
  //     alert('Email address tidak valid')
  //     return true
  //   } else if (!passwd || passwd.length < 8) {
  //     alert('Password minimal 8 karakter')
  //     return true
  //   }
  //   return false
  // }

  const handleSignup = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    console.log('Signup')
    console.log(form.checkValidity())
    if (!validMatch) {
      alert('Password confirmation tidak sama')
      e.preventDefault()
      e.stopPropagation()
    }
    try {
      const response = await backendClient({
        method: 'post',
        url: '/registeruser',
        data: { email: user, password: pwd },
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('Sukses')
      setConfirmMsg('Aktivasi user silakan check di email ' + emailaddr)
      alert('Periksa email untuk konfirmasi registration')
      navigate('/login')
    } catch (error) {
      console.log(error.message)
      setConfirmMsg(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className="mb-3" style={{ maxWidth: '640px' }}>
            <CRow className="g-0">
              <CCol className="align-self-center" md={5}>
                <CCardImage src={logo} />
              </CCol>
              <CCol md={7}>
                <CCardBody>
                  <CCardTitle>Register User</CCardTitle>
                  <CCardText>Daftarkan alamat email anda</CCardText>
                  <CForm onSubmit={handleSignup}>
                    <CFormInput
                      type="email"
                      id="username"
                      placeholder="Email"
                      autoComplete="off"
                      value={user}
                      label="Alamat Email"
                      ref={userRef}
                      text="Masukkan valid email disini."
                      feedbackInvalid="Email tidak valid."
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <CFormInput
                      type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={pwd}
                      label="Password"
                      minLength="5"
                      feedbackInvalid="Password minimal 5 character."
                      required
                      aria-invalid={validPwd ? 'false' : 'true'}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      onChange={(e) => setPwd(e.target.value)}
                    />
                    <CFormInput
                      type="password"
                      id="confirm_pwd"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      value={matchPwd}
                      label="Confirm Password"
                      required
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      onChange={(e) => setMatchPwd(e.target.value)}
                    />
                    {/* <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        id="emailAddress"
                        placeholder="Email"
                        autoComplete="off"
                        value={user}
                        ref={userRef}
                        required
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPasswd(e.target.value)}
                      />
                    </CInputGroup> */}
                    <CRow className="mt-3">
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Sign Up
                        </CButton>
                      </CCol>
                      {showAlert && <CAlert color="primary">{confirmMsg}</CAlert>}
                    </CRow>
                    <CRow className="mt-2">
                      <CCol xs={12} className="text-left">
                        Sudah terdaftar?
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => navigate(gotoLogin, { replace: true })}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCol>
            </CRow>
          </CCard>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
