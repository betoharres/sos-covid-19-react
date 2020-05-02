import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
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
  Fab,
} from '@material-ui/core'
import useSupercluster from 'use-supercluster'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Marker from './Marker/Marker'
import Cluster from './Cluster/Cluster'
import {
  Container,
  PopoverView,
  IconContainer,
  RefreshIcon,
  ReportIconContainer,
  RecordVoiceOverIcon,
  RefreshIconContainer,
} from './CasesMap.styles'

import { useLocation } from '../../hooks'
import { stateColors } from '../../constants'
import { fetchReports } from '../../api'

function CasesMap() {
  const mapRef = useRef()
  const history = useHistory()
  const { t } = useTranslation()
  const [markers, setMarkers] = useState([])
  const [popoverInfo, setPopoverInfo] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState(false)
  const { currentLocation, hasLocation, updateLocation } = useLocation()
  const [viewport, setViewport] = useState({
    latitude: -30.018486,
    longitude: -51.13534,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  })
  const bounds =
    mapRef.current && mapRef.current.getMap().getBounds().toArray().flat()

  const points = useMemo(
    () =>
      markers.map(
        ({ id, latitude, longitude, phoneNumber, aasmState: state }) => ({
          type: 'Feature',
          properties: { reportId: id, phoneNumber, state },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        })
      ),
    [markers]
  )

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 90, maxZoom: 17 },
  })

  const loadMarkers = useCallback(async ({ latitude, longitude }) => {
    const params = { latitude, longitude }
    const apiReports = await fetchReports(params)
    setMarkers(apiReports)
  }, [])

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

  useEffect(() => {
    loadMarkers(currentLocation)
  }, [loadMarkers, currentLocation])

  useEffect(() => {
    setShowRefreshBtn(true)
  }, [viewport])

  const mapPointsCount = useMemo(() => points.length, [points])

  const handleClickMarker = ({
    event: { currentTarget },
    reportData: { phoneNumber, state },
  }) => {
    setPopoverInfo([{ phoneNumber, state }])
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function setMapRef(ref) {
    mapRef.current = ref
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

  function onClickRefreshBtn() {
    loadMarkers({ ...viewport })
    setShowRefreshBtn(false)
  }

  function onClickReportBtn() {
    history.push('/reportar')
  }

  const open = Boolean(anchorEl)
  const popoverId = open ? 'simple-popover' : undefined

  return (
    <ReactMapGL
      {...viewport}
      ref={setMapRef}
      maxZoom={16}
      minZoom={10}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
    >
      <Container>
        {showRefreshBtn && (
          <RefreshIconContainer>
            <Fab
              variant="extended"
              size="medium"
              aria-label="atualizar"
              onClick={onClickRefreshBtn}
            >
              <IconContainer>
                <RefreshIcon />
              </IconContainer>
              {t('Atualizar')}
            </Fab>
          </RefreshIconContainer>
        )}
        <ReportIconContainer>
          <Fab
            variant="extended"
            color="secondary"
            size="large"
            aria-label="Reportar problema de saude"
            onClick={onClickReportBtn}
          >
            <RecordVoiceOverIcon />
          </Fab>
        </ReportIconContainer>
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
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  {popoverInfo.map(({ reportId, phoneNumber, state }) => (
                    <PopoverView key={`${reportId}`}>
                      <ListItem button onClick={Function.prototype}>
                        <ListItemAvatar>
                          <Avatar
                            style={{ backgroundColor: stateColors[state] }}
                          />
                        </ListItemAvatar>
                        <ListItemText>{phoneNumber}</ListItemText>
                      </ListItem>
                    </PopoverView>
                  ))}
                </Popover>
              </div>
            )
          }
        )}
      </Container>
    </ReactMapGL>
  )
}

export default CasesMap
