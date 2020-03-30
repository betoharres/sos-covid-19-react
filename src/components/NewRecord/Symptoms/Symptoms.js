import React from 'react'
import { func } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useSet } from 'react-use'
import {
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
} from '@material-ui/core'
import { Container, ListItem } from './Symptoms.styles'

export default function Symptoms({ handleOnChange }) {
  const [selectedSymptoms, { has, toggle }] = useSet(new Set())
  const { t } = useTranslation()

  const symptoms = [
    t('Febre'),
    t('Cansaço'),
    t('Tosse seca'),
    t('Dor de cabeça'),
    t('Perda do olfato'),
    t('Perda do paladar'),
  ]

  function onClickSymptom(symptom) {
    toggle(symptom)
    handleOnChange(selectedSymptoms.add(symptom))
  }

  return (
    <Container>
      {symptoms.map((symptom, index) => (
        <div key={symptom}>
          <Divider />
          <ListItem button onClick={() => onClickSymptom(symptom)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                disableRipple
                tabIndex={-1}
                checked={has(symptom)}
                inputProps={{ 'aria-labelledby': symptom }}
              />
            </ListItemIcon>
            <ListItemText>{symptom}</ListItemText>
          </ListItem>
          {++index === symptoms.length && <Divider />}
        </div>
      ))}
    </Container>
  )
}

Symptoms.propTypes = {
  handleOnChange: func.isRequired,
}
