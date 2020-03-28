/* eslint-disable */
import React from 'react'
import { string, number, func } from 'prop-types'
import { Container } from './Cluster.styles'

export default function Cluster({
  id,
  lat,
  lng,
  pointCount,
  totalPointsCount,
  phone,
  state,
  onClick,
}) {
  return null
}

Cluster.propTypes = {
  id: number.isRequired,
  lat: number.isRequired,
  lng: number.isRequired,
  pointCount: number.isRequired,
  totalPointsCount: number.isRequired,
  phone: string.isRequired,
  state: string.isRequired,
  onClick: func.isRequired,
}
