import React from 'react'
import { string, func, number } from 'prop-types'
import { Circle } from './Marker.styles'
import { stateColors } from '../../../constants'

export default function Marker({ zoom, state, onClick }) {
  return <Circle zoom={zoom} onClick={onClick} color={stateColors[state]} />
}

Marker.propTypes = {
  zoom: number.isRequired,
  state: string,
  onClick: func,
}
