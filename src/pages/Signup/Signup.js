import React from 'react'
import { useTranslation } from 'react-i18next'

import { Register } from '../../components'
import { Container } from './Signup.styles'

const Signup = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <h1>{t('Cadastro')}</h1>
      <Register />
    </Container>
  )
}

export default Signup
