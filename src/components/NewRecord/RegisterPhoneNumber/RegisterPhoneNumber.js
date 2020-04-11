import React from 'react'
import { func } from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'
import InputMask from 'react-input-mask'
import PhoneIcon from '@material-ui/icons/Phone'
import { useTranslation } from 'react-i18next'

import { Container, Title, PhoneFieldView } from './RegisterPhoneNumber.styles'

export default function RegisterPhoneNumber({ handleOnChange }) {
  const { t } = useTranslation()
  return (
    <Container>
      <Title variant="h5" gutterBottom>
        {t('Celular para contato')}
      </Title>
      <PhoneFieldView>
        <InputMask
          mask="(99) 999-99-99-99"
          onChange={({ target: { value } }) => handleOnChange(value)}
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
    </Container>
  )
}

RegisterPhoneNumber.propTypes = {
  handleOnChange: func.isRequired,
}
