import React from 'react'
import { Trans } from 'react-i18next'
import {
  Stepper,
  Step,
  StepLabel,
  Container as MUIContainer,
} from '@material-ui/core'
import { useStateList } from 'react-use'

import Symptoms from './Symptoms/Symptoms'
import RegisterPhoneNumber from './RegisterPhoneNumber/RegisterPhoneNumber'
import { Container, Paper } from './NewRecord.styles'

const steps = [<Trans key={0}>Sintomas</Trans>, <Trans key={1}>Contato</Trans>]
const stepIndexes = [...Array(steps.length).keys()]

export default function NewRecord(props) {
  const { currentIndex: activeStep, prev, next } = useStateList(stepIndexes)
  const [symptomsStep, registerPhoneNumberStep] = stepIndexes

  function getCurrentStepContent(currentStep) {
    switch (currentStep) {
      case symptomsStep:
        return <Symptoms onPressNext={next} />
      case registerPhoneNumberStep:
        return <RegisterPhoneNumber onPressPrev={prev} />
      default:
        return <Symptoms />
    }
  }

  return (
    <Container>
      <MUIContainer>
        <Paper elevation={2}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
        {getCurrentStepContent(activeStep)}
      </MUIContainer>
    </Container>
  )
}
