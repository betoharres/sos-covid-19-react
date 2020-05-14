import styled from 'styled-components'

export const Container = styled.div`
  ${({ clusteredPointsCount, mapPointsCount }) => `
    color: #fff;
    background: #1978c8;
    border-radius: 50%;
    padding: 10px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${10 + (clusteredPointsCount / mapPointsCount) * 20}px;
    height: ${10 + (clusteredPointsCount / mapPointsCount) * 20}px;
    cursor: pointer;
  `}
`
