import React, { useState } from 'react'
import { func } from 'prop-types'
import {
  TextField,
  InputAdornment,
  Typography,
  Button,
} from '@material-ui/core'
import InputMask from 'react-input-mask'
import PhoneIcon from '@material-ui/icons/Phone'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import ConfirmNumber from '../../ConfirmNumber/ConfirmNumber'
import Modal from '../../Modal/Modal'
import {
  Container,
  Title,
  PhoneFieldView,
  ActionContainer,
  NotesContainer,
} from './RegisterPhoneNumber.styles'
import './RegisterPhoneNumber.translations'

import { useLocalStorage } from '../../../hooks'
import { patientKey } from '../../../constants'
import { postSymptoms, postPhone, requestResendSMS } from '../../../api'
import {
  setLocalPhoneToken,
  getLocalPhoneToken,
  deleteLocalPhoneToken,
  deleteLocalAuthToken,
} from '../../../storage'

export default function RegisterPhoneNumber({ onPressPrev }) {
  const [patient] = useLocalStorage(patientKey)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phone, setPhone] = useState(null)
  const { t } = useTranslation()
  const history = useHistory()

  function showNewRecordSuccessMessage() {
    alert(t('Sintomas enviados com sucesso!'))
  }

  function canContinue() {
    return (phone && !phone.length) || isLoading
  }

  function formatAndSetPhone(value) {
    if (value) {
      setPhone(`+55${value.replace(/(55)|\D|_/g, '')}`)
    }
  }

  async function createNewPhoneRecord(phone) {
    try {
      const response = await postPhone(phone)
      setLocalPhoneToken(phone, response.token)
      if (response.isSmsSent) {
        setIsModalOpen(true)
      }
      return response
    } catch (response) {
      deleteLocalPhoneToken(phone)
      const json = await response.json()
      if (json.number[0] === 'has already been taken') {
        await handleResendSMS()
      } else {
        alert(t('Não foi possível cadastrar seu telefone.'))
      }
    }
  }

  async function createNewPatientRecord(patient, phoneToken) {
    try {
      await postSymptoms({ ...patient, phone_token: phoneToken })
      showNewRecordSuccessMessage()
      history.push('/mapa')
    } catch (error) {
      deleteLocalPhoneToken(phone)
      deleteLocalAuthToken(phone)
      alert(t('Não foi possível registrar seus sintomas. Tente novamente.'))
    }
  }

  async function onSubmit() {
    setIsLoading(true)
    const phoneToken = getLocalPhoneToken(phone)
    if (phoneToken) {
      await createNewPatientRecord(patient, phoneToken)
    } else {
      await createNewPhoneRecord(phone)
    }
    setIsLoading(false)
  }

  async function handleSubmitPhoneValidation({ success, token }) {
    if (success) {
      await createNewPatientRecord(patient, token)
      setIsModalOpen(false)
    } else {
      alert('Código inválido. Tente novamente.')
    }
  }

  async function handleResendSMS() {
    setIsLoading(true)
    try {
      const { success } = await requestResendSMS(phone)
      if (success) {
        alert(t(`Código SMS enviado para ${phone}`))
        setIsModalOpen(true)
      }
    } catch (response) {
      if (response.status === 404) {
        alert(t('Cadastro expirado. Faça o registro dos sintomas novamente.'))
      } else if (response.status === 406) {
        alert(t('Aguarde alguns minutos para reenviar código SMS.'))
      } else {
        alert(t('Não foi possível reenviar seu pedido. Tente novamente.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal isOpen={isModalOpen}>
        <ConfirmNumber phone={phone} onSubmit={handleSubmitPhoneValidation} />
      </Modal>
      <Container>
        <Title variant="h5" gutterBottom>
          {t('Celular para contato')}
        </Title>
        <PhoneFieldView>
          <InputMask
            mask="(99) 999-99-99-99"
            onChange={({ target: { value } }) => formatAndSetPhone(value)}
          >
            {() => (
              <TextField
                type="tel"
                label={t('Número:')}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </InputMask>
        </PhoneFieldView>
        <NotesContainer>
          <Typography variant="caption">
            {t('RegisterPhoneNumber:Details')}
          </Typography>
        </NotesContainer>
      </Container>
      <ActionContainer>
        <Button
          onClick={onPressPrev}
          aria-label={t('Voltar para o formulário')}
        >
          {t('Voltar')}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={canContinue()}
          variant="contained"
          aria-label={t('Enviar sintomas e número de telefone')}
          color="primary"
        >
          {t('Próximo')}
        </Button>
      </ActionContainer>
    </>
  )
}

RegisterPhoneNumber.propTypes = {
  onPressPrev: func.isRequired,
}
