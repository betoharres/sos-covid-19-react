import React from 'react'
import { string, func } from 'prop-types'
import { Circle } from './Marker.styles'
import { stateColors } from '../../../constants'

export default function Marker({ state, onClick }) {
  return <Circle onClick={onClick} color={stateColors[state]} />
}

Marker.propTypes = {
  state: string,
  onClick: func,
}
