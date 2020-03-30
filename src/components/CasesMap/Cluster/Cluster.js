import React from 'react'
import { number } from 'prop-types'
import { Container } from './Cluster.styles'

export default function Cluster({ mapPointsCount, clusteredPointsCount }) {
  return (
    <Container
      mapPointsCount={mapPointsCount}
      clusteredPointsCount={clusteredPointsCount}
    >
      {clusteredPointsCount}
    </Container>
  )
}

Cluster.propTypes = {
  clusteredPointsCount: number.isRequired,
  mapPointsCount: number.isRequired,
}
