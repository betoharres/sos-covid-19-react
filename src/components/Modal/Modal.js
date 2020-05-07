import React from 'react'
import { bool, node } from 'prop-types'

import { Container, Modal as StyledModal } from './Modal.styles'

export default function Modal({ isOpen, children }) {
  return (
    <StyledModal open={isOpen}>
      <Container>{children}</Container>
    </StyledModal>
  )
}

Modal.propTypes = {
  isOpen: bool,
  children: node.isRequired,
}

Modal.defaultProps = {
  isOpen: false,
}
