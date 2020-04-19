import React from 'react'
import { func } from 'prop-types'
import { TextField, InputAdornment, Divider } from '@material-ui/core'
import SmsIcon from '@material-ui/icons/Sms'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Title,
  Subtitle,
  PhoneFieldView,
} from './ConfirmNumber.styles'

export default function ConfirmNumber({ handleOnChange }) {
  const { t } = useTranslation()
  return (
    <Container>
      <Title variant="h5" gutterBottom>
        {t('Confirme seu número')}
      </Title>
      <Divider />
      <Title variant="h6" gutterBottom>
        {t('Enviamos um código SMS para o seu celular')}
      </Title>
      <Subtitle>{t('Digite o código abaixo:')}</Subtitle>
      <PhoneFieldView>
        <TextField
          label={t('Código SMS:')}
          variant="outlined"
          type="number"
          placeholder="0000"
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

ConfirmNumber.propTypes = {
  handleOnChange: func.isRequired,
}
