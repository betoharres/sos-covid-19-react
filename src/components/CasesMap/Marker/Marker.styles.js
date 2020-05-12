import styled from 'styled-components'
import { PersonPinCircle as MUIPersonPinCircle } from '@material-ui/icons'

export const Container = styled.div``

const randomMarginLeft = Math.abs(Math.random() * (90 - 20) + 20)
const randomMarginBottom = Math.abs(Math.random() * (90 - 20) + 20)

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
  ${({ color, zoom }) => `
    opacity: 0.6;
    margin-left: -${randomMarginLeft}px;
    margin-bottom: -${randomMarginBottom}px;
    height: ${(zoom ** 2) * 0.7}px;
    width: ${(zoom ** 2) * 0.7}px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${color};
    cursor: pointer;
  `}
`
