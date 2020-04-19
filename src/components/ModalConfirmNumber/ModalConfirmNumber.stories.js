import React from 'react'
import ModalConfirmNumber from './ModalConfirmNumber'

export default {
  component: ModalConfirmNumber,
  title: 'ModalConfirmNumber',
}

export const Open = () => (
  <ModalConfirmNumber isOpen handleOnChange={Function.prototype} />
)

export const Closed = () => (
  <ModalConfirmNumber handleOnChange={Function.prototype} />
)
