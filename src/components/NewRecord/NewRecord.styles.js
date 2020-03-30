import styled from 'styled-components'
import { Typography as MUITypography } from '@material-ui/core'

export const Container = styled.div`
  flex: 1;
  height: 100vh;
  width: 100%;
  background-color: lightgrey;
  padding: 20px;
`

export const Typography = styled(MUITypography)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export const StepContainer = styled.div`
  background-color: white;
`

export const ActionContainer = styled.div`
  margin-top: 20px;
`
