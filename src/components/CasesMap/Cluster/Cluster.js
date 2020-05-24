import React from 'react'
import { Typography } from '@material-ui/core'
import { number, func } from 'prop-types'
import { Container } from './Cluster.styles'

export default function Cluster({
  mapPointsCount,
  clusteredPointsCount,
  onClick,
  zoom,
}) {
  return (
    <Container
      zoom={zoom}
      onClick={onClick}
      mapPointsCount={mapPointsCount}
      clusteredPointsCount={clusteredPointsCount}
    >
      <Typography>{clusteredPointsCount}</Typography>
    </Container>
  )
}

Cluster.propTypes = {
  zoom: number.isRequired,
  onClick: func.isRequired,
  clusteredPointsCount: number.isRequired,
  mapPointsCount: number.isRequired,
}
