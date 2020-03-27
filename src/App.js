import React, { useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'

// import { useLocation } from './hooks'
import { MapView } from './App.styles'

function App() {
  const mapRef = useRef()
  const [zoom, setZoom] = useState(10)
  const [, setBounds] = useState(null)
  const defaultCenter = { lat: 59.95, lng: 30.33 }

  function onGoogleApiLoaded({ map, maps }) {
    mapRef.current = map
  }

  function onChangeMap({ zoom, bounds }) {
    setZoom(zoom)
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat])
  }

  return (
    <MapView>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={onChangeMap}
      />
    </MapView>
  )
}

export default App
