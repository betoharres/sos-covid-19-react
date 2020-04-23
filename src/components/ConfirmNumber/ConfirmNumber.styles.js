import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Button as MUIButton } from '@material-ui/core'

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
  padding-bottom: 40px;
  flex-direction: column;
`

export const PhoneFieldView = styled.div`
  flex-direction: row;
  margin-top: 15px;
  max-width: 150px;
`

export const Title = styled(Typography).attrs()``
export const Subtitle = styled(Typography).attrs()``

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`
export const Button = styled(MUIButton)``
