import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import SmsIcon from '@material-ui/icons/Sms'
import { useTranslation } from 'react-i18next'

import { Container, Title, PhoneFieldView } from './ConfirmNumber.styles'

export default function RegisterPhoneNumber() {
  const { t } = useTranslation()
  return (
    <Container>
      <Title variant="h4" gutterBottom>
        {t('Você irá receber um código por SMS')}
      </Title>
      <PhoneFieldView>
        <TextField
          label={t('Código SMS:')}
          variant="outlined"
          type="number"
          placeholder="00000"
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

RegisterPhoneNumber.propTypes = {}
