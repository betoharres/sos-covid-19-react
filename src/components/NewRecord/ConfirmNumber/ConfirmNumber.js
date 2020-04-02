import React from 'react'
import { func } from 'prop-types'
import { TextField, InputAdornment } from '@material-ui/core'
import SmsIcon from '@material-ui/icons/Sms'
import { useTranslation } from 'react-i18next'

import { Container, Title, PhoneFieldView } from './ConfirmNumber.styles'

export default function RegisterPhoneNumber({ handleOnChange }) {
  const { t } = useTranslation()
  return (
    <Container>
      <Title variant="h5" gutterBottom>
        {t('Confirme seu número com código enviado por SMS')}
      </Title>
      <PhoneFieldView>
        <TextField
          label={t('Código SMS:')}
          variant="outlined"
          type="number"
          placeholder="00000"
          onChange={({ target: { value } }) => handleOnChange(value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SmsIcon />
              </InputAdornment>
            ),
          }}
        />
      </PhoneFieldView>
    </Container>
  )
}

RegisterPhoneNumber.propTypes = {
  handleOnChange: func.isRequired,
}
