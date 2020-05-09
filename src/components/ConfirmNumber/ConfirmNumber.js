import React, { useState } from 'react'
import { func, string } from 'prop-types'
import {
  TextField,
  InputAdornment,
  Divider,
  Link,
  Typography,
} from '@material-ui/core'
import SmsIcon from '@material-ui/icons/Sms'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Title,
  Subtitle,
  PhoneFieldView,
  Button,
  ButtonContainer,
  ResendLinkContainer,
} from './ConfirmNumber.styles'

import { postCode, requestResendSMS } from '../../api'

export default function ConfirmNumber({ phone, onSubmit }) {
  const [isLoading, setIsLoading] = useState()
  const { t } = useTranslation()
  const [code, setCode] = useState(null)

  async function handleOnSubmit() {
    setIsLoading(true)
    try {
      const { success, ...response } = await postCode(phone, code)
      onSubmit({ code, response, success })
    } catch {
      alert(t('Não foi possível enviar o código SMS. Tente novamente'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendSMS() {
    setIsLoading(true)
    try {
      const response = await requestResendSMS(phone)
      if (response.success) {
        alert(t(`Código SMS enviado para ${phone}`))
      }
    } catch (response) {
      if (response.status === 404) {
        alert(t('Cadastro expirado. Faça o registro dos sintomas novamente.'))
      } else if (response.status === 406) {
        alert(t('Aguarde alguns minutos para reenviar.'))
      } else {
        alert(t('Não foi possível reenviar seu pedido. Tente novamente.'))
      }
    } finally {
      setIsLoading(false)
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
      <ResendLinkContainer>
        <Typography>
          <Link onClick={handleResendSMS}>
            {t('Ainda não recebeu SMS? Clique aqui para reenviar')}
          </Link>
        </Typography>
      </ResendLinkContainer>
      <ButtonContainer>
        <Button
          color="primary"
          variant="contained"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {t('Enviar Código')}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

ConfirmNumber.propTypes = {
  onSubmit: func.isRequired,
  phone: string.isRequired,
}
