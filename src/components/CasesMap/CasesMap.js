import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { array } from 'prop-types'
import ReactMapGL, {
  Marker as MapBoxMarker,
  FlyToInterpolator,
} from 'react-map-gl'
import {
  Popover,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from '@material-ui/core'
import useSupercluster from 'use-supercluster'

import Marker from './Marker/Marker'
import Cluster from './Cluster/Cluster'
import { PopoverView } from './CasesMap.styles'

import { useLocation } from '../../hooks'
import { stateColors } from '../../constants'
import { fetchReports } from '../../api'

function CasesMap() {
  const [markers, setMarkers] = useState([])
  const [popoverInfo, setPopoverInfo] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const mapRef = useRef()
  const { currentLocation, hasLocation, updateLocation } = useLocation()
  const [viewport, setViewport] = useState({
    latitude: -30.018486,
    longitude: -51.13534,
    width: '100vw',
    height: '100vh',
    zoom: 11,
  })
  const bounds =
    mapRef.current && mapRef.current.getMap().getBounds().toArray().flat()

  const points = useMemo(
    () =>
      markers.map(({ id, latitude, longitude, phone, aasm_state: state }) => ({
        type: 'Feature',
        properties: { reportId: id, phone, state },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      })),
    [markers]
  )

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 90, maxZoom: 17 },
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
    } else {
      updateLocation()
    }
  }, [currentLocation, hasLocation, updateLocation])

  const loadMarkers = useCallback(async () => {
    const { latitude, longitude } = currentLocation
    const { zoom } = viewport
    const params = { latitude, longitude, map_zoom: zoom }
    const apiReports = await fetchReports(params)
    setMarkers(apiReports)
  }, [currentLocation, viewport])

  useEffect(() => {
    if (hasLocation) {
      loadMarkers()
    }
  }, [loadMarkers, hasLocation])

  const mapPointsCount = useMemo(() => points.length, [points])

  const handleClickMarker = ({
    event: { currentTarget },
    reportData: { phone, state },
  }) => {
    setPopoverInfo([{ phone, state }])
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleClickCluster({ id, event: { currentTarget } }) {
    let markers = supercluster.getLeaves(id)
    markers = markers.reduce(
      (acc, { properties }) => acc.concat({ ...properties }),
      []
    )
    setPopoverInfo(markers)
    setAnchorEl(currentTarget)
  }

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined

  return (
    <ReactMapGL
      {...viewport}
      ref={setMapRef}
      maxZoom={17}
      minZoom={10}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
    >
      {clusters.map(
        ({
          id,
          properties: {
            cluster: isCluster,
            point_count: clusteredPointsCount,
            ...reportData
          },
          geometry: {
            coordinates: [lng, lat],
          },
        }) => {
          return (
            <div key={`${lat}${lng}${id || reportData.reportId}`}>
              <MapBoxMarker latitude={lat} longitude={lng}>
                {isCluster ? (
                  <Cluster
                    mapPointsCount={mapPointsCount}
                    clusteredPointsCount={clusteredPointsCount}
                    onClick={(event) => handleClickCluster({ event, id })}
                  />
                ) : (
                  <Marker
                    state={reportData.state}
                    onClick={(event) =>
                      handleClickMarker({ event, reportData })
                    }
                  />
                )}
              </MapBoxMarker>
              <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                {popoverInfo.map(
                  ({ reportId, phone: { number: phone }, state }) => (
                    <PopoverView key={`${reportId}`}>
                      <ListItem button onClick={Function.prototype}>
                        <ListItemAvatar>
                          <Avatar
                            style={{ backgroundColor: stateColors[state] }}
                          />
                        </ListItemAvatar>
                        <ListItemText>{phone}</ListItemText>
                      </ListItem>
                    </PopoverView>
                  )
                )}
              </Popover>
            </div>
          )
        }
      )}
    </ReactMapGL>
  )
}

CasesMap.propTypes = {
  reports: array.isRequired,
}

export default CasesMap
