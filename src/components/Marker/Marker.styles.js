import styled from 'styled-components'
import { PersonPinCircle as MUIPersonPinCircle } from '@material-ui/icons'

export const Container = styled.div``

export const PersonPinCircle = styled(MUIPersonPinCircle).attrs({
  style: {
    fontSize: 40,
  },
})`
  ${({color}) => `
    color: ${color};
    width: 20px;
    height: 20px;
    font-size: 40px;
    cursor: pointer;
`}
`
