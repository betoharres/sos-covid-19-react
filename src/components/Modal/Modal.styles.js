import styled from 'styled-components'
import { Modal as MUIModal, Paper } from '@material-ui/core'

export const Container = styled(Paper)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 20px;
`

export const Modal = styled(MUIModal).attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
`
