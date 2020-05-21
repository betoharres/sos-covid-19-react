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
} from '@material-ui/core'
import useSupercluster from 'use-supercluster'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import Marker from './Marker/Marker'
import Cluster from './Cluster/Cluster'
import {
  MapContentContainer,
  ReportFAB,
  RefreshFAB,
  PopoverView,
  IconContainer,
  RefreshIcon,
  RecordVoiceOverIcon,
  RefreshContainer,
  SymptomsBtnContainer,
} from './CasesMap.styles'

import { useLocation } from '../../hooks'
import { stateColors } from '../../constants'
import { fetchReports } from '../../api'

function CasesMap() {
  const mapRef = useRef()
  const history = useHistory()
  const { t } = useTranslation()
  const [markers, setMarkers] = useState([])
  const [isLoadingReports, setIsLoadingReports] = useState(false)
  const [popoverInfo, setPopoverInfo] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState(false)
  const { currentLocation, hasLocation, updateLocation } = useLocation()
  const [viewport, setViewport] = useState({
    latitude: -30.018486,
    longitude: -51.13534,
    width: '100%',
    height: 'calc(100vh - 53px)',
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
    try {
      const apiReports = await fetchReports(params)
      setMarkers(apiReports)
    } catch {
      // alert(t('Não foi possível atualizar os registros.'))
    } finally {
      setShowRefreshBtn(false)
      setIsLoadingReports(false)
    }
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
    }
  }, [currentLocation, hasLocation, updateLocation])

  useEffect(() => {
    if (hasLocation) {
      loadMarkers(currentLocation)
    }
  }, [hasLocation, loadMarkers, currentLocation])

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
    setIsLoadingReports(true)
    loadMarkers({ ...viewport })
  }

  function onClickReportBtn() {
    history.push('/sintomas')
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
      <MapContentContainer>
        <RefreshContainer>
          <RefreshFAB
            variant="extended"
            size="medium"
            aria-label="atualizar mapa"
            showRefreshBtn={showRefreshBtn}
            disabled={isLoadingReports}
            onClick={onClickRefreshBtn}
          >
            <IconContainer>
              <RefreshIcon />
            </IconContainer>
            {t(isLoadingReports ? 'Aguarde...' : 'Atualizar')}
          </RefreshFAB>
        </RefreshContainer>
        {isMobile && (
          <SymptomsBtnContainer>
            <ReportFAB
              variant="extended"
              color="secondary"
              size="large"
              aria-label="Reportar sintomas de covid-19"
              onClick={onClickReportBtn}
            >
              <>
                <IconContainer>
                  <RecordVoiceOverIcon />
                </IconContainer>
                {t('Reportar Sintomas')}
              </>
            </ReportFAB>
          </SymptomsBtnContainer>
        )}
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
                      zoom={viewport.zoom}
                      state={reportData.state}
                      onClick={(event) =>
                        handleClickMarker({ event, reportData })
                      }
                    />
                  )}
                </MapBoxMarker>
                {reportData && reportData.phoneNumber && (
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
                )}
              </div>
            )
          }
        )}
      </MapContentContainer>
    </ReactMapGL>
  )
}

export default CasesMap
