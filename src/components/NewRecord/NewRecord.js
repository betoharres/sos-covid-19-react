import React, { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { useStateList } from 'react-use'

import { useLocation } from '../../hooks'

import Symptoms from './Symptoms/Symptoms'
import RegisterPhoneNumber from './RegisterPhoneNumber/RegisterPhoneNumber'
import ConfirmNumber from './ConfirmNumber/ConfirmNumber'
import { Container, ActionContainer, StepContainer } from './NewRecord.styles'

const steps = [
  <Trans key={0}>Sintomas</Trans>,
  <Trans key={1}>Contato</Trans>,
  <Trans key={2}>Código SMS</Trans>,
]
const stepIndexes = [...Array(steps.length).keys()]

export default function NewRecord() {
  const [symptoms, setSymptoms] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const { currentLocation, hasLocation, getCurrentPosition } = useLocation()
  const { currentIndex: activeStep, prev, next } = useStateList(stepIndexes)
  const { t } = useTranslation()

  const [symptomsStep, registerPhoneNumberStep, confirmNumberStep] = stepIndexes

  async function sendSymptoms() {
    const newRecord = {
      symptoms,
      phone,
      location: currentLocation,
      code,
    }
    if (hasLocation) {
      fetch('localhost:3000', newRecord)
    } else {
      try {
        const { coords } = await getCurrentPosition()
        fetch('localhost:3000', { newRecord, location: coords })
      } catch {
        alert('Não foi possível obter a localização.')
      }
    }
  }

  function getCurrentStepContent(currentStep) {
    switch (currentStep) {
      case symptomsStep:
        return <Symptoms handleOnChange={setSymptoms} />
      case registerPhoneNumberStep:
        return <RegisterPhoneNumber handleOnChange={setPhone} />
      case confirmNumberStep:
        return <ConfirmNumber handleOnChange={setCode} />
      default:
        return <Symptoms />
    }
  }

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepContainer>{getCurrentStepContent(activeStep)}</StepContainer>
      <ActionContainer>
        <Button onClick={prev}>{t('Voltar')}</Button>
        {activeStep === confirmNumberStep ? (
          <Button onClick={next} variant="contained" color="secondary">
            {t('Confirmar Número')}
          </Button>
        ) : (
          <Button onClick={next} variant="contained" color="primary">
            {t('Próximo')}
          </Button>
        )}
      </ActionContainer>
    </Container>
  )
}
