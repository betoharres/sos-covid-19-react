import styled from 'styled-components'

export const Container = styled.div``

const randomMargin = parseInt(Math.random() * (120 - 20) + 20)

export const Circle = styled.span`
  ${({ color, zoom }) => `
    opacity: 0.6;
    margin-top: ${randomMargin - (zoom ** 2) * 0.7}px;
    margin-bottom: ${randomMargin - (zoom ** 2) * 0.7}px;
    margin-left: ${randomMargin - (zoom ** 2) * 0.7}px;
    margin-right: ${randomMargin - (zoom ** 2) * 0.7}px;
    height: ${(zoom ** 2) * 0.8}px;
    width: ${(zoom ** 2) * 0.8}px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${color};
    cursor: pointer;
  `}
`
