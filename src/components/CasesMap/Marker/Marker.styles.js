import styled from 'styled-components'

export const Container = styled.div``

const randomMarginLeft = Math.abs(Math.random() * (99 - 10) + 10)
const randomMarginBottom = Math.abs(Math.random() * (99 - 10) + 10)

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
