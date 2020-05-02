import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { useStateList } from 'react-use'

import Symptoms from './Symptoms/Symptoms'
import RegisterPhoneNumber from './RegisterPhoneNumber/RegisterPhoneNumber'
import ConfirmNumber from '../ConfirmNumber/ConfirmNumber'
import Modal from '../Modal/Modal'
import { Container, ActionContainer, StepContainer } from './NewRecord.styles'

import { useLocation } from '../../hooks'
import { postSymptoms } from '../../api'
import { formatSymptoms } from './Symptoms/utils'

const steps = [<Trans key={0}>Sintomas</Trans>, <Trans key={1}>Contato</Trans>]
const stepIndexes = [...Array(steps.length).keys()]

export default function NewRecord(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [symptoms, setSymptoms] = useState(new Set())
  const [phone, setPhone] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { currentLocation, getCurrentPosition, hasLocation } = useLocation()
  const { currentIndex: activeStep, prev, next } = useStateList(stepIndexes)
  const { t } = useTranslation()
  const history = useHistory()

  const [symptomsStep, registerPhoneNumberStep] = stepIndexes

  function formatAndSetPhone(text) {
    setPhone(`+55${text.replace(/-|\(|\)|\s/g, '')}`)
  }

  function showNewRecordSuccessMessage() {
    alert(t('Sintomas enviados com sucesso!'))
    history.push('/mapa')
  }

  async function sendSymptoms() {
    const symptomsObj = formatSymptoms(symptoms)
    setIsLoading(true)
    try {
      const { latitude, longitude } = hasLocation
        ? currentLocation
        : await getCurrentPosition()
      const params = { ...symptomsObj, latitude, longitude, phone }
      const { isSmsSent } = await postSymptoms(params)
      if (isSmsSent) {
        setIsModalOpen(true)
      } else {
        showNewRecordSuccessMessage()
        next()
      }
    } catch {
      alert(t('Não foi possível enviar seus sintomas. Tente novamente'))
    } finally {
      setIsLoading(false)
    }
  }

  function getCurrentStepContent(currentStep) {
    switch (currentStep) {
      case symptomsStep:
        return <Symptoms handleOnChange={setSymptoms} />
      case registerPhoneNumberStep:
        return <RegisterPhoneNumber handleOnChange={formatAndSetPhone} />
      default:
        return <Symptoms />
    }
  }

  async function onPressNext() {
    switch (activeStep) {
      case symptomsStep:
        next()
        break
      case registerPhoneNumberStep:
        await sendSymptoms()
        break
      default:
        break
    }
  }

  function isNextBtnDisabled() {
    switch (activeStep) {
      case symptomsStep:
        return !symptoms.size
      case registerPhoneNumberStep:
        return !phone.replace(/(55)|\D|_/g, '').length
      default:
        break
    }
  }

  function handleSubmitPhoneValidation({ success }) {
    if (success) {
      setIsModalOpen(false)
      showNewRecordSuccessMessage()
      next()
    } else {
      alert('Erro. Tente novamente.')
    }
  }

  return (
    <Container>
      <Modal isOpen={isModalOpen}>
        <ConfirmNumber phone={phone} onSubmit={handleSubmitPhoneValidation} />
      </Modal>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepContainer>{getCurrentStepContent(activeStep)}</StepContainer>
      <ActionContainer>
        <Button
          disabled={activeStep === symptomsStep || isLoading}
          onClick={prev}
        >
          {t('Voltar')}
        </Button>
        <Button
          onClick={onPressNext}
          disabled={isLoading || isNextBtnDisabled()}
          variant="contained"
          color="primary"
        >
          {t('Próximo')}
        </Button>
      </ActionContainer>
    </Container>
  )
}
