import styled from 'styled-components'
import {
  Typography as MUITypography,
  Paper as MUIPaper,
} from '@material-ui/core'

export const Container = styled.section`
  background-color: lightgrey;
  padding-top: 20px;
  height: 100%;
  min-height: 100vh;
`

export const Paper = styled(MUIPaper)``

export const Typography = styled(MUITypography)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export const ActionContainer = styled.div`
  margin-top: 20px;
`
