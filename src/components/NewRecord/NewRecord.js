import React, { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { useStateList } from 'react-use'

import Symptoms from './Symptoms/Symptoms'
import RegisterPhoneNumber from './RegisterPhoneNumber/RegisterPhoneNumber'
import ConfirmNumber from './ConfirmNumber/ConfirmNumber'
import { Container, ActionContainer, StepContainer } from './NewRecord.styles'

import { useLocation } from '../../hooks'
import { postSymptoms } from '../../api'
import { formatSymptoms } from './Symptoms/utils'

const steps = [
  <Trans key={0}>Sintomas</Trans>,
  <Trans key={1}>Contato</Trans>,
  <Trans key={2}>Código SMS</Trans>,
]
const stepIndexes = [...Array(steps.length).keys()]

export default function NewRecord() {
  const [isLoading, setIsLoading] = useState(false)
  const [symptoms, setSymptoms] = useState(null)
  const [phone, setPhone] = useState(null)
  const [code, setCode] = useState(null)
  const { currentLocation } = useLocation()
  const { currentIndex: activeStep, prev, next } = useStateList(stepIndexes)
  const { t } = useTranslation()

  const [symptomsStep, registerPhoneNumberStep, confirmNumberStep] = stepIndexes

  async function sendSymptoms() {
    const symptomsObj = formatSymptoms(symptoms)
    try {
      setIsLoading(true)
      await postSymptoms({ ...symptomsObj, phone, ...currentLocation })
    } catch {
      alert(t('Não foi possível enviar seus sintomas. Tente novamente'))
    } finally {
      setIsLoading(false)
    }
  }

  async function sendConfirmationCode() {
    try {
      setIsLoading(true)
      await postSymptoms({ code })
    } catch {
      alert(t('Não foi possível enviar o código SMS. Tente novamente'))
    } finally {
      setIsLoading(false)
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

  async function onPressNext() {
    switch (activeStep) {
      case symptomsStep:
        next()
        break
      case registerPhoneNumberStep:
        await sendSymptoms()
        next()
        break
      case confirmNumberStep:
        await sendConfirmationCode()
        // TODO: redirects somewhere else
        break
      default:
        break
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
        <Button disabled={activeStep === symptomsStep} onClick={prev}>
          {t('Voltar')}
        </Button>
        {activeStep === confirmNumberStep ? (
          <Button onClick={onPressNext} variant="contained" color="secondary">
            {t('Confirmar Número')}
          </Button>
        ) : (
          <Button
            onClick={onPressNext}
            disabled={isLoading}
            variant="contained"
            color="primary"
          >
            {t('Próximo')}
          </Button>
        )}
      </ActionContainer>
    </Container>
  )
}
