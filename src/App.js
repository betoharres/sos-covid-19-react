import React from 'react'
import GoogleMapReact from 'google-map-react'

import { MapView } from './App.styles'

function App() {
  return (
    <MapView>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33,
        }}
        defaultZoom={10}
      />
    </MapView>
  )
}

export default App
