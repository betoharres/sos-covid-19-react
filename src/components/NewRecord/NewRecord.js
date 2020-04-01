import React, {useState} from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { useStateList } from 'react-use'

import Symptoms from './Symptoms/Symptoms'
import RegisterPhoneNumber from './RegisterPhoneNumber/RegisterPhoneNumber'
import ConfirmNumber from './ConfirmNumber/ConfirmNumber'
import { Container, ActionContainer, StepContainer } from './NewRecord.styles'

const steps = [
  <Trans key={0}>Sintomas</Trans>,
  <Trans key={1}>Telefone para Contato</Trans>,
  <Trans key={2}>Confirme o Telefone</Trans>,
]
const stepIndexes = [...Array(steps.length).keys()]

export default function NewRecord() {
  const [, setSymptoms] = useState(null)
  const [, setPhone] = useState(null)
  const [, setCode] = useState(null)
  const { currentIndex: activeStep, prev, next } = useStateList(stepIndexes)
  const { t } = useTranslation()

  const [symptomsStep, registerPhoneNumberStep, confirmNumberStep] = stepIndexes

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
            {t('Enviar Sintomas')}
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
