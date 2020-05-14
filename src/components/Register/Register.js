import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { useToggle, useLocalStorage } from 'react-use'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { Container, FormContainer, FieldContainer } from './Register.styles'

import ConfirmNumber from '../ConfirmNumber/ConfirmNumber'
import Modal from '../Modal/Modal'

import { volunteerKey } from '../../constants'
import { postVolunteer } from '../../api'

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, toggleShowPassword] = useToggle(false)
  const [localVolunteer, setLocalVolunteer] = useLocalStorage(volunteerKey, {})
  const { t } = useTranslation()
  const { handleChange, values, errors, touched, handleBlur } = useFormik({
    onSubmit,
    initialValues: {
      name: localVolunteer.name,
      email: localVolunteer.email,
      identifier_type: localVolunteer.identifierType,
      identifier: localVolunteer.identifier,
      website: localVolunteer.website,
      phone: localVolunteer.phoneNumber,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t('Obrigatório'))
        .min(2, t('Nome muito curto'))
        .max(40, t('Nome muito longo')),
      phone: Yup.string().required(t('Obrigatório')),
      identifier_type: Yup.string()
        .required(t('Obrigatório'))
        .min(3, t('Muito curto'))
        .max(6, t('Muito longo')),
      identifier: Yup.string()
        .required(t('Obrigatório'))
        .min(3, t('Muito curto'))
        .max(10, t('Muito longo')),
      email: Yup.string()
        .required(t('Obrigatório'))
        .email(t('E-mail inválido')),
      website: Yup.string().nullable().url(),
      password: Yup.string()
        .required(t('Obrigatório'))
        .min(6, t('Senha deve ser no mínimo 6 caracteres')),
    }),
  })

  async function onSubmit() {
    try {
      const volunteer = await postVolunteer(values)
      setLocalVolunteer(volunteer)
      if (volunteer.isSmsSent) {
        setIsModalOpen(true)
      } else {
        alert(t('Cadastro efetuado com sucesso!'))
      }
    } catch (error) {
      alert(t('Não foi possível efetuar o cadastro. Tente novamente'))
    }
  }

  function handlePhoneChange(event) {
    event.target.value = `+55${event.target.value.replace(/(55)|\D|_/g, '')}`
    handleChange(event)
  }

  function handleSubmitSmsCode({ success }) {
    if (success) {
      setIsModalOpen(false)
      alert(t('Cadastro efetuado com sucesso!'))
    } else {
      alert('Erro. Tente novamente.')
    }
  }

  function handleMouseDownPassword(event) {
    event.preventDefault()
  }

  return (
    <Container>
      <Modal isOpen={isModalOpen}>
        <ConfirmNumber phone={values.phone} onSubmit={handleSubmitSmsCode} />
      </Modal>
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
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.name && errors.name}
            />
            {touched.name && errors.name && (
              <Typography variant="caption" color="error">
                {errors.name}
              </Typography>
            )}
          </FieldContainer>
          <InputMask
            mask="(99) 999-99-99-99"
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
          >
            {({ onChange, onBlur }) => (
              <FieldContainer>
                <TextField
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                  error={touched.phone && errors.phone}
                  label={t('Celular')}
                />
                {touched.phone && errors.phone && (
                  <Typography variant="caption" color="error">
                    {errors.phone}
                  </Typography>
                )}
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
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.identifier_type && errors.identifier_type}
            />
            {touched.identifier_type && errors.identifier_type && (
              <Typography variant="caption" color="error">
                {errors.identifier_type}
              </Typography>
            )}
          </FieldContainer>
          <FieldContainer>
            <TextField
              required
              type="text"
              variant="outlined"
              id="identifier"
              name="identifier"
              label={t('Identificação')}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.identifier && errors.identifier}
            />
            {touched.identifier && errors.identifier && (
              <Typography variant="caption" color="error">
                {errors.identifier}
              </Typography>
            )}
          </FieldContainer>
          <FieldContainer>
            <TextField
              type="text"
              variant="outlined"
              id="website"
              name="website"
              label={t('Site')}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.website && errors.website}
            />
            {touched.website && errors.website && (
              <Typography variant="caption" color="error">
                {errors.website}
              </Typography>
            )}
          </FieldContainer>
          <FieldContainer>
            <TextField
              required
              type="text"
              variant="outlined"
              id="email"
              name="email"
              label={t('E-mail')}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Typography variant="caption" color="error">
                {errors.email}
              </Typography>
            )}
          </FieldContainer>
          <FieldContainer>
            <TextField
              required
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              id="password"
              name="password"
              label={t('Senha')}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Mostrar/esconder senha"
                      onClick={toggleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {touched.password && errors.password && (
              <Typography variant="caption" color="error">
                {errors.password}
              </Typography>
            )}
          </FieldContainer>
          <FieldContainer>
            <Button
              onClick={onSubmit}
              type="button"
              disabled={Object.keys(errors).length}
            >
              {t('Enviar')}
            </Button>
          </FieldContainer>
        </FormContainer>
      </form>
    </Container>
  )
}
