import React, { useState } from 'react'
import { func } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLocalStorage, useSet } from 'react-use'

import {
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Button,
  Typography,
} from '@material-ui/core'
import {
  Container,
  Paper,
  ListItem,
  TextField,
  ActionContainer,
  FieldContainer,
  SubTitleContainer,
  SymptomsContainer,
} from './Symptoms.styles'

import { useLocation } from '../../../hooks'
import { patientKey } from '../../../constants'
import { formatSymptoms } from './utils'

export default function Symptoms({ onPressNext }) {
  const [, savePatientLocally] = useLocalStorage(patientKey)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { currentLocation, getCurrentPosition, hasLocation } = useLocation()
  const [selectedSymptoms, { has, toggle }] = useSet(new Set())
  const { handleChange, values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      name: null,
      age: null,
      weight: null,
      description: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(t('Obrigatório')).nullable(),
      age: Yup.number(t('Deve ser um número'))
        .nullable()
        .integer(t('Deve ser somente número'))
        .typeError(t('Deve ser somente número'))
        .positive(t('Número deve ser positivo'))
        .max(120, t('Número não pode ser maior que 120'))
        .required(t('Obrigatório')),
      weight: Yup.number(t('Deve ser somente número'))
        .nullable()
        .integer(t('Deve ser um número'))
        .integer(t('Deve ser um número'))
        .typeError(t('Deve ser um número'))
        .positive(t('Número deve ser positivo'))
        .max(500, t('Deve ser menor que 500'))
        .required(t('Obrigatório')),
      description: Yup.string()
        .max(200, t('Máximo 200 caracteres'))
        .nullable(),
    }),
  })

  const symptomLabels = [
    t('Febre'),
    t('Cansaço'),
    t('Tosse seca'),
    t('Dor de cabeça'),
    t('Perda do olfato'),
    t('Perda do paladar'),
  ]

  async function onSubmit() {
    setIsLoading(true)
    const formattedSymptoms = formatSymptoms(selectedSymptoms)
    try {
      const { latitude, longitude } = hasLocation
        ? currentLocation
        : await getCurrentPosition()
      savePatientLocally({
        patient: { ...formattedSymptoms, latitude, longitude, ...values },
      })
      onPressNext()
    } catch {
      alert(t('Não foi possível obter sua localização. Tente novamente'))
    } finally {
      setIsLoading(false)
    }
  }

  function isFormInvalid() {
    return !(selectedSymptoms.size && !Object.keys(errors).length)
  }

  return (
    <Container>
      <Paper>
        <SubTitleContainer>
          <Typography variant="h4">{t('Seus dados')}</Typography>
        </SubTitleContainer>
        <FieldContainer>
          <TextField
            fullWidth
            required
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
            type="number"
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
            type="number"
            id="weight"
            name="weight"
            label={t('Peso')}
            aria-label={t('Insira peso')}
            onBlur={handleBlur}
            error={touched.weight && errors.weight}
            onChange={handleChange}
          />
          {touched.weight && errors.weight && (
            <Typography variant="caption" color="error">
              {errors.weight}
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
          <Typography variant="h4">{t('Observações')}</Typography>
        </SubTitleContainer>
        <FieldContainer>
          <TextField
            multiline
            rowsMin={5}
            fullWidth
            type="number"
            id="description"
            name="description"
            aria-label={t('Insira observações sobre seu caso')}
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
      </Paper>
      <ActionContainer>
        <Button disabled aria-label={t('Voltar para o formulário')}>
          {t('Voltar')}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading || isFormInvalid()}
          variant="contained"
          aria-label={t('Ir para o próximo passo')}
          color="primary"
        >
          {t('Próximo')}
        </Button>
      </ActionContainer>
    </Container>
  )
}

Symptoms.propTypes = {
  onPressNext: func.isRequired,
}
