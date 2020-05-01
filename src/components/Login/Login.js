import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Container, FormContainer, FieldContainer } from './Login.styles'

import { volunteerKey } from '../../constants'
import { postLogin } from '../../api'

export default function Login() {
  const [localVolunteer] = useLocalStorage(volunteerKey, {})
  const { t } = useTranslation()
  const { handleChange, values } = useFormik({
    onSubmit,
    initialValues: {
      email: localVolunteer.email,
      password: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('e-mail inválido'))
        .required(t('obrigatório')),
      password: Yup.string()
        .required(t('obrigatório')),
    }),
  })

  function onSubmit() {
    postLogin(values)
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <FormContainer>
          <FieldContainer>
            <TextField
              required
              type="text"
              variant="outlined"
              id="email"
              name="email"
              label={t('E-mail')}
              onChange={handleChange}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              required
              type="password"
              variant="outlined"
              id="password"
              name="password"
              label={t('Senha')}
              onChange={handleChange}
            />
          </FieldContainer>
          <FieldContainer>
            <Button onClick={onSubmit} type="button">
              {t('Enviar')}
            </Button>
          </FieldContainer>
        </FormContainer>
      </form>
    </Container>
  )
}
