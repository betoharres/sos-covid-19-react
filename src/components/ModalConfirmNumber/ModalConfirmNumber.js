import React, { useState } from 'react'
import { func, bool } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ClickAwayListener } from '@material-ui/core'

import ConfirmNumber from '../ConfirmNumber/ConfirmNumber'
import {
  Container,
  Modal,
  Button,
  ButtonContainer,
} from './ModalConfirmNumber.styles'

import { postCode } from '../../api'

export default function ModalConfirmNumber({ isOpen, handleOnChange }) {
  const [code, setCode] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [isCodeValid, setIsCodeValid] = useState(false)
  const { t } = useTranslation()

  async function handleOnSubmitCode() {
    try {
      const response = await postCode(code)
      setIsCodeValid(true)
      handleOnChange({ code, response, isCodeValid })
    } catch (error) {
      // console.error(error)
      handleOnChange({ error })
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsModalOpen(false)}>
      <Modal open={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <Container>
          <ConfirmNumber handleChange={setCode} />
          <ButtonContainer>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOnSubmitCode}
            >
              {t('Enviar')}
            </Button>
          </ButtonContainer>
        </Container>
      </Modal>
    </ClickAwayListener>
  )
}

ModalConfirmNumber.propTypes = {
  handleOnChange: func.isRequired,
  isOpen: bool,
}

ModalConfirmNumber.defaultProps = {
  isOpen: false,
}
