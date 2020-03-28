import React from 'react'
import { number, bool } from 'prop-types'

import Cluster from '../Cluster/Cluster'

export default function Marker({
  id,
  isCluster,
  lat,
  lng,
  clusterProperties: { mapPointsCount, clusteredPointsCount },
}) {
  if (isCluster) {
    return (
      <Cluster
        id={id}
        mapPointsCount={mapPointsCount}
        clusteredPointsCount={clusteredPointsCount}
      />
    )
  } else {
    return null
  }
}

Marker.propTypes = {
  id: number,
  isCluster: bool,
  lat: number.isRequired,
  lng: number.isRequired,
}

Marker.defaultProps = {
  id: null,
  isCluster: false,
}
