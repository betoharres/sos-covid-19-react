import React, { useRef, useState, useMemo, useEffect } from 'react'
import ReactMapGL, {
  Marker as MapBoxMarker,
  FlyToInterpolator,
} from 'react-map-gl'
import useSupercluster from 'use-supercluster'

import { Marker } from './components'
import { useLocation } from './hooks'

const mock = [
  { id: 1, lat: -30.017919, lng: -51.135678, phone: '123', state: 'waiting' },
  { id: 2, lat: -30.017636, lng: -51.134417, phone: '125', state: 'testing' },
  { id: 3, lat: -30.010361, lng: -51.135318, phone: '127', state: 'infected' },
  { id: 4, lat: -30.014644, lng: -51.140382, phone: '130', state: 'discard' },
]

const points = mock.map(({ id, lat, lng, phone, state }) => ({
  type: 'Feature',
  properties: { reportId: id, phone, state },
  geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
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

  useEffect(() => {
    if (hasLocation) {
      const { latitude, longitude } = currentLocation
      setViewport((oldViewPortState) => ({
        ...oldViewPortState,
        latitude,
        longitude,
        transitionInterpolator: new FlyToInterpolator({
          speed: 2,
        }),
        transitionDuration: 'auto',
      }))
    }
  }, [currentLocation, hasLocation])

  const mapPointsCount = useMemo(() => points.length, [])

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      ref={setMapRef}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
    >
      {clusters.map(
        ({
          id,
          properties: {
            cluster: isCluster,
            reportId,
            phone,
            state,
            point_count: clusteredPointsCount,
          },
          geometry: {
            coordinates: [lng, lat],
          },
        }) => {
          return (
            <MapBoxMarker
              key={`${lat}${lng}${id || reportId}`}
              latitude={lat}
              longitude={lng}
            >
              <Marker
                id={id}
                lat={lat}
                lng={lng}
                state={state}
                phone={phone}
                isCluster={!!isCluster}
                clusterProperties={{ clusteredPointsCount, mapPointsCount }}
              />
            </MapBoxMarker>
          )
        }
      )}
    </ReactMapGL>
  )
}

export default App
