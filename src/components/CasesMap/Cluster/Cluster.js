import React from 'react'
import { number, func } from 'prop-types'
import { Container } from './Cluster.styles'

export default function Cluster({
  mapPointsCount,
  clusteredPointsCount,
  onClick,
}) {
  return (
    <Container
      onClick={onClick}
      mapPointsCount={mapPointsCount}
      clusteredPointsCount={clusteredPointsCount}
    >
      {clusteredPointsCount}
    </Container>
  )
}

Cluster.propTypes = {
  onClick: func.isRequired,
  clusteredPointsCount: number.isRequired,
  mapPointsCount: number.isRequired,
}
