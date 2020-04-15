import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { Container, FormContainer, FieldContainer } from './Register.styles'

import { postVolunteer } from '../../api'

export default function Register() {
  const { t } = useTranslation()
  const { handleChange, values } = useFormik({
    onSubmit,
    initialValues: {
      name: null,
      email: null,
      identifier_type: null,
      identifier: null,
      phone: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, t('Nome muito curto'))
        .max(40, t('Nome muito longo'))
        .required(t('Obrigatório')),
      phone: Yup.string().required(t('Obrigatório')),
      identifierType: Yup.string()
        .min(3, t('Muito curto'))
        .max(6, t('Muito longo'))
        .required(t('Obrigatório')),
      identifier: Yup.string()
        .min(3, t('Muito curto'))
        .max(10, t('Muito longo'))
        .required(t('Obrigatório')),
      email: Yup.string()
        .email(t('E-mail inválido'))
        .required(t('Obrigatório')),
    }),
  })

  function onSubmit() {
    postVolunteer(values)
  }

  function handlePhoneChange(event) {
    event.target.value = `+55${event.target.value.replace(/(55)|\D|_/g, '')}`
    handleChange(event)
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
              id="name"
              name="name"
              label={t('Nome')}
              onChange={handleChange}
            />
          </FieldContainer>
          <InputMask mask="(99) 999-99-99-99" onChange={handlePhoneChange}>
            {({ onChange }) => (
              <FieldContainer>
                <TextField
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  variant="outlined"
                  onChange={onChange}
                  label={t('Celular')}
                />
              </FieldContainer>
            )}
          </InputMask>
          <FieldContainer>
            <TextField
              required
              type="text"
              variant="outlined"
              id="identifier_type"
              name="identifier_type"
              label={t('Tipo Identificação(CRM/COREN/etc...)')}
              onChange={handleChange}
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              required
              type="text"
              variant="outlined"
              id="identifier"
              name="identifier"
              label={t('Identificação')}
              onChange={handleChange}
            />
          </FieldContainer>
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
            <Button onClick={onSubmit} type="button">
              {t('Enviar')}
            </Button>
          </FieldContainer>
        </FormContainer>
      </form>
    </Container>
  )
}
