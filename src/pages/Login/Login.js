import React from 'react'
import { useTranslation } from 'react-i18next'
import { Login as LoginForm } from '../../components'
import { Container } from './Login.styles'

const Login = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <h1>{t('Entrar como Voluntário')}</h1>
      <LoginForm />
    </Container>
  )
}

export default Login
