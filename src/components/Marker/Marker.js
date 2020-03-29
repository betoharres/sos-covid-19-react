import React from 'react'
import { number, bool, string, shape } from 'prop-types'
import Cluster from '../Cluster/Cluster'

import { PersonPinCircle } from './Marker.styles'

export default function Marker({
  id,
  isCluster,
  lat,
  lng,
  state,
  clusterProperties: { mapPointsCount, clusteredPointsCount },
}) {
  function getMarkerColor(state) {
    switch(state) {
      case 'waiting':
        return 'blue'
      case 'testing':
        return 'orange'
      case 'infected':
        return 'red'
      case 'discard':
        return 'black'
      default:
        return 'black'
    }
  }
  if (isCluster) {
    return (
      <Cluster
        id={id}
        mapPointsCount={mapPointsCount}
        clusteredPointsCount={clusteredPointsCount}
      />
    )
  } else {
    return <PersonPinCircle color={getMarkerColor(state)} />
  }
}

Marker.propTypes = {
  id: number,
  isCluster: bool,
  state: string,
  phone: string,
  clusterProperties: shape({
    clusteredPointsCount: number,
    mapPointsCount: number.isRequired,
  }),
}

Marker.defaultProps = {
  id: null,
  isCluster: false,
}
