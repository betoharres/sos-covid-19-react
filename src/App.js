/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import useSupercluster from 'use-supercluster'

import { useLocation } from './hooks'

const mock = [
  { id: 1, lat: -30.017919, lng: -51.135678, phone: '123', state: 'waiting' },
  { id: 2, lat: -30.017636, lng: -51.134417, phone: '125', state: 'waiting' },
  { id: 3, lat: -30.010361, lng: -51.135318, phone: '127', state: 'waiting' },
  { id: 4, lat: -30.014644, lng: -51.140382, phone: '130', state: 'waiting' },
]

const points = mock.map(({ id, lat, lng, phone, state }) => ({
  type: 'Feature',
  properties: { cluster: false, reportId: id, phone, state },
  geometry: {
    type: 'Point',
    coordinates: [parseFloat(lng), parseFloat(lat)],
  },
}))

function App() {
  const mapRef = useRef()
  const { currentLocation, hasLocation } = useLocation()
  const [viewport, setViewport] = useState({
    latitude: -30.018486,
    longitude: -51.13534,
    width: '100vw',
    height: '100vh',
    zoom: 11,
  })
  const bounds =
    mapRef.current && mapRef.current.getMap().getBounds().toArray().flat()

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  })

  function setMapRef(ref) {
    mapRef.current = ref
  }

  function onLoad() {
    if (hasLocation) {
      const { latitude, longitude } = currentLocation
      setViewport({
        ...viewport,
        latitude,
        longitude,
        transitionInterpolator: new FlyToInterpolator({
          speed: 2,
        }),
        transitionDuration: 'auto',
      })
    }
  }

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      onLoad={onLoad}
      ref={setMapRef}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
    />
  )
}

export default App
