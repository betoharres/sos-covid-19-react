import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
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
  const { handleChange, values } = useFormik({
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
      site: Yup.string().url(),
      password: Yup.string().min(6).required(t('Obrigatório')),
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
              type="text"
              variant="outlined"
              id="website"
              name="website"
              label={t('Site')}
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
            <TextField
              required
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              id="password"
              name="password"
              label={t('Senha')}
              onChange={handleChange}
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
