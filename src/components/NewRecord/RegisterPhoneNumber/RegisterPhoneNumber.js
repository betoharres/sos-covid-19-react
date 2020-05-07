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
import { useLocalStorage } from 'react-use'
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

import { postSymptoms } from '../../../api'
import { patientKey } from '../../../constants'

export default function RegisterPhoneNumber({ onPressPrev }) {
  const [{ patient }] = useLocalStorage(patientKey)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phone, setPhone] = useState(null)
  const { t } = useTranslation()
  const history = useHistory()

  function showNewRecordSuccessMessage() {
    alert(t('Sintomas enviados com sucesso!'))
  }

  function disableSubmitButton() {
    return !phone.replace(/(55)|\D|_/g, '').length
  }

  async function onSubmit() {
    const formattedPhone = `+55${phone.replace(/-|\(|\)|\s/g, '')}`
    patient.phone = formattedPhone
    try {
      const { isSmsSent } = await postSymptoms(patient)
      if (isSmsSent) {
        setIsModalOpen(true)
      } else {
        showNewRecordSuccessMessage()
        history.push('/mapa')
      }
    } catch {
      alert(t('Não foi possível enviar seus sintomas. Tente novamente'))
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmitPhoneValidation({ success }) {
    if (success) {
      setIsModalOpen(false)
      showNewRecordSuccessMessage()
      history.push('/mapa')
    } else {
      alert('Erro. Tente novamente.')
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
          <InputMask mask="(99) 999-99-99-99" onChange={setPhone}>
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
          disabled={isLoading || disableSubmitButton()}
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
