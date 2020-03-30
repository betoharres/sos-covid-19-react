import styled from 'styled-components'
import { PersonPinCircle as MUIPersonPinCircle } from '@material-ui/icons'

export const Container = styled.div``

export const PersonPinCircle = styled(MUIPersonPinCircle).attrs(
  ({ color }) => ({
    color: 'inherit',
    style: {
      fontSize: 40,
      color,
    },
  })
)`
  ${({ color }) => `
    color: ${color};
    width: 20px;
    height: 20px;
    font-size: 40px;
    cursor: pointer;
`}
`

export const Circle = styled.span`
  ${({ color }) => `
    opacity: 0.6;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${color};
  `}
`
