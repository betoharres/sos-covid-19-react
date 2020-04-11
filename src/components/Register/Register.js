import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { Container } from './Register.styles'

export default function Register() {
  const { t } = useTranslation()
  const { handleChange } = useFormik({
    initialValues: {
      name: '',
      identifierType: '',
      identifier: '',
      phone: '',
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
      password: Yup.string().required(t('Obrigatório')),
    }),
    onSubmit: (values) => Function.prototype,
  })

  function handleFieldChange({ target: { value } }) {
    handleChange(value)
  }

  return (
    <Container>
      <TextField
        required
        type="text"
        variant="outlined"
        id="name"
        name="name"
        label={t('Nome')}
        onChange={handleFieldChange}
      />
      <InputMask
        mask="(99) 999-99-99-99"
        onChange={handleFieldChange}
      >
        {() => (
          <TextField
            required
            type="tel"
            variant="outlined"
            label={t('Celular')}
          />
        )}
      </InputMask>
      <TextField
        required
        type="text"
        variant="outlined"
        id="identifierType"
        name="identifierType"
        label={t('Tipo Identificação(CRM/COREN/etc...)')}
        onChange={handleFieldChange}
      />
      <TextField
        required
        type="text"
        variant="outlined"
        id="identifier"
        name="identifier"
        label={t('Identificação')}
        onChange={handleFieldChange}
      />
      <TextField
        required
        type="text"
        variant="outlined"
        id="email"
        name="email"
        label={t('E-mail')}
        onChange={handleFieldChange}
      />
      <TextField
        required
        type="password"
        variant="outlined"
        id="password"
        name="password"
        label={t('Senha')}
        onChange={handleFieldChange}
      />
      <Button type="submit">{t('Enviar')}</Button>
    </Container>
  )
}
