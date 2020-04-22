import React from 'react'
import { func, bool, node } from 'prop-types'

import { Container, Modal as StyledModal } from './Modal.styles'

export default function Modal({
  isOpen,
  children,
  handleOnChange,
}) {
  return (
    <StyledModal open={isOpen}>
      <Container>{children}</Container>
    </StyledModal>
  )
}

Modal.propTypes = {
  handleOnChange: func.isRequired,
  isOpen: bool,
  children: node.isRequired,
}

Modal.defaultProps = {
  isOpen: false,
}
