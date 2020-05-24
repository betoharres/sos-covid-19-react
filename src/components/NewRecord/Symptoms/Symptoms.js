import React, { useState, useEffect } from 'react'
import { func } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSet } from 'react-use'
import { Alert, AlertTitle } from '@material-ui/lab'

import {
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Button,
  Typography,
  Switch,
  Link,
  FormGroup,
  FormControlLabel,
  IconButton,
} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

import { Modal } from '../../../components'

import {
  Container,
  Paper,
  ListItem,
  TextField,
  ActionContainer,
  FieldContainer,
  SubTitleContainer,
  SymptomsContainer,
  NotesContainer,
  WelcomeContainer,
  HelpBtnContainer,
} from './Symptoms.styles'

import { useLocation, useLocalStorage } from '../../../hooks'
import { patientKey, showWelcomeKey } from '../../../constants'
import { formatSymptoms } from './utils'

import './Symptoms.translations'

export default function Symptoms({ onPressNext }) {
  const [showAlert, setShowAlert] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [, setPatient] = useLocalStorage(patientKey)
  const [showModal, setShowModal] = useLocalStorage(showWelcomeKey, true)
  const { t } = useTranslation()
  const {
    currentLocation,
    updateLocation,
    hasLocation,
    isLoadingLocation,
  } = useLocation()
  const [selectedSymptoms, { has, toggle }] = useSet(new Set())
  const { handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      name: null,
      age: null,
      sick_days: null,
      description: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().nullable().trim(),
      age: Yup.number(t('Somente números'))
        .nullable()
        .integer(t('Somente números'))
        .typeError(t('Somente números'))
        .positive(t('Número deve ser positivo'))
        .max(120, t('Número não pode ser maior que 120'))
        .required(t('Obrigatório')),
      sick_days: Yup.number(t('Somente números'))
        .nullable()
        .integer(t('Somente números'))
        .typeError(t('Somente números'))
        .positive(t('Número deve ser positivo'))
        .max(45, t('Deve ser menor que 500'))
        .moreThan(0, t('Mínimo de 1 dia'))
        .required(t('Obrigatório')),
      description: Yup.string()
        .max(200, t('Máximo 200 caracteres'))
        .nullable()
        .trim(),
    }),
  })

  useEffect(() => {
    if (!isLoadingLocation) {
      setShowAlert(!hasLocation)
    }
  }, [isLoadingLocation, hasLocation])

  const symptomLabels = [
    t('Febre'),
    t('Cansaço'),
    t('Tosse'),
    t('Dor de garganta'),
    t('Dor de cabeça'),
    t('Perda do olfato'),
    t('Perda do paladar'),
    t('Dedos avermelhados'),
  ]

  async function onSubmit() {
    const formattedSymptoms = formatSymptoms(selectedSymptoms)
    try {
      const { latitude, longitude } = hasLocation
        ? currentLocation
        : await updateLocation()
      const patientData = {
        latitude,
        longitude,
        ...formattedSymptoms,
        ...values,
      }
      setPatient(patientData)
      onPressNext()
    } catch {
      setShowAlert(true)
      alert(t('Não foi possível obter sua localização. Tente novamente'))
    }
  }

  function isFormInvalid() {
    return !(
      values.age &&
      values.sick_days &&
      hasLocation &&
      selectedSymptoms.size &&
      !Object.keys(errors).length &&
      isTermsAccepted
    )
  }

  return (
    <Container>
      {showAlert && (
        <Alert severity="error">
          <AlertTitle>{t('Localização invávlida')}</AlertTitle>
          {t('Localização aproximada necessária.')}
        </Alert>
      )}
      <Modal isOpen={showModal}>
        <WelcomeContainer>
          <Typography variant="h4">{t('Symptoms:Welcome')}</Typography>
          <Typography>{t('Symptoms:Intro')}</Typography>
        </WelcomeContainer>
        <ActionContainer>
          <Button onClick={() => setShowModal(false)} fullWidth>
            {t('Fechar')}
          </Button>
        </ActionContainer>
      </Modal>
      <Paper>
        <SubTitleContainer>
          <Typography variant="h4">{t('Seus dados')}</Typography>
        </SubTitleContainer>
        <FieldContainer>
          <TextField
            fullWidth
            type="text"
            id="name"
            name="name"
            label={t('Nome')}
            aria-label={t('Insira seu nome')}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && (
            <Typography variant="caption" color="error">
              {errors.name}
            </Typography>
          )}
        </FieldContainer>
        <FieldContainer>
          <TextField
            fullWidth
            required
            type="tel"
            pattern="[0-9]"
            id="age"
            name="age"
            label={t('Idade')}
            aria-label={t('Insira sua idade')}
            onBlur={handleBlur}
            error={touched.age && errors.age}
            onChange={handleChange}
          />
          {touched.age && errors.age && (
            <Typography variant="caption" color="error">
              {errors.age}
            </Typography>
          )}
        </FieldContainer>
        <FieldContainer>
          <TextField
            fullWidth
            required
            type="tel"
            id="sick_days"
            pattern="[0-9]"
            name="sick_days"
            label={t('Quantos dias tem sintomas?')}
            aria-label={t('Insira peso em kilogramas')}
            onBlur={handleBlur}
            error={touched.sick_days && errors.sick_days}
            onChange={handleChange}
          />
          {touched.sick_days && errors.sick_days && (
            <Typography variant="caption" color="error">
              {errors.sick_days}
            </Typography>
          )}
        </FieldContainer>
        <SubTitleContainer>
          <Typography variant="h4">{t('Sintomas')}</Typography>
        </SubTitleContainer>
        <SymptomsContainer>
          {symptomLabels.map((symptom, index) => (
            <div key={symptom}>
              <Divider />
              <ListItem button onClick={() => toggle(symptom)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    disableRipple
                    tabIndex={-1}
                    aria-label={symptom}
                    checked={has(symptom)}
                    inputProps={{ 'aria-labelledby': symptom }}
                  />
                </ListItemIcon>
                <ListItemText>{t(symptom)}</ListItemText>
              </ListItem>
            </div>
          ))}
        </SymptomsContainer>
        <SubTitleContainer>
          <Typography variant="h4">{t('Mais detalhes')}</Typography>
          <Typography gutterBottom variant="caption">
            {t('Máximo de 200 caracteres')}
          </Typography>
        </SubTitleContainer>
        <FieldContainer>
          <TextField
            multiline
            rowsMin={5}
            fullWidth
            type="text"
            id="description"
            name="description"
            label={t('Conte seus primeiros sintomas')}
            aria-label={t('Conte mais sobre seu caso')}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            onChange={handleChange}
          />
          {touched.description && errors.description && (
            <Typography variant="caption" color="error">
              {errors.description}
            </Typography>
          )}
        </FieldContainer>
        <FieldContainer>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={isTermsAccepted}
                  color="primary"
                  onChange={() =>
                    setIsTermsAccepted((currentState) => !currentState)
                  }
                />
              }
              label={
                <>
                  Eu li e concordo com os{' '}
                  <Link color="primary" variant="inherit" href="/termosdeuso">
                    Termos de uso
                  </Link>
                </>
              }
            />
          </FormGroup>
        </FieldContainer>
      </Paper>
      <ActionContainer>
        <Button disabled aria-label={t('Voltar para o formulário')}>
          {t('Voltar')}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isFormInvalid()}
          variant="contained"
          aria-label={t('Ir para o próximo passo')}
          color="primary"
        >
          {t('Próximo')}
        </Button>

        <HelpBtnContainer>
          <IconButton
            aria-label="add to shopping cart"
            onClick={() => setShowModal(true)}
          >
            <HelpIcon />
          </IconButton>
        </HelpBtnContainer>
      </ActionContainer>
      <NotesContainer>
        <Typography variant="caption">
          {t(
            'Localização aproximada do aparelho é necessária para o registro.'
          )}
        </Typography>
      </NotesContainer>
    </Container>
  )
}

Symptoms.propTypes = {
  onPressNext: func.isRequired,
}
