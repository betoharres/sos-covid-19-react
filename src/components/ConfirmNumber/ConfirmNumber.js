import React, { useState } from 'react'
import { func, string } from 'prop-types'
import { TextField, InputAdornment, Divider } from '@material-ui/core'
import SmsIcon from '@material-ui/icons/Sms'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Title,
  Subtitle,
  PhoneFieldView,
  Button,
  ButtonContainer,
} from './ConfirmNumber.styles'

import { postCode } from '../../api'

export default function ConfirmNumber({ phone, onSubmit }) {
  const { t } = useTranslation()
  const [code, setCode] = useState(null)

  async function handleOnSubmit() {
    try {
      const { success, ...response } = await postCode(phone, code)
      onSubmit({ code, response, success })
    } catch {
      alert(t('Não foi possível enviar o código SMS. Tente novamente'))
    }
  }

  return (
    <Container>
      <Title variant="h5" gutterBottom>
        {t('Confirme seu número')}
      </Title>
      <Divider />
      <Title variant="h6" gutterBottom>
        {t(`Enviamos um código SMS para ${phone}`)}
      </Title>
      <Subtitle>{t('Digite o código abaixo:')}</Subtitle>
      <PhoneFieldView>
        <TextField
          label={t('Código SMS:')}
          variant="outlined"
          type="number"
          placeholder="0000"
          onChange={({ target: { value } }) => setCode(value)}
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
      <ButtonContainer>
        <Button color="primary" variant="contained" onClick={handleOnSubmit}>
          {t('Enviar')}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

ConfirmNumber.propTypes = {
  onSubmit: func.isRequired,
  phone: string.isRequired,
}
