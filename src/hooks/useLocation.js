import { useState, useEffect, useCallback } from 'react'

export default function useLocation({
  latitude,
  longitude,
  altitude,
  timeout = 15000,
  maximumAge = 0,
  enableHighAccuracy = true,
  onError = Function.prototype,
} = {}) {
  const [error, setError] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentLocation, setCurrentLocation] = useState(() => {
    if (
      !(
        isNaN(Number(latitude)) &&
        isNaN(Number(longitude)) &&
        isNaN(Number(altitude))
      )
    ) {
      return { latitude, longitude, altitude }
    } else {
      return {}
    }
  })

  const hasLocation = !(
    isNaN(currentLocation.latitude) && isNaN(currentLocation.longitude)
  )

  const getCurrentPosition = useCallback(
    (options) =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout,
          maximumAge,
          enableHighAccuracy,
          ...options,
        })
      ),
    [timeout, maximumAge, enableHighAccuracy]
  )

  const updateLocation = useCallback(async () => {
    try {
      const { coords } = await getCurrentPosition()
      setCurrentLocation(coords)
      setError(null)
      setIsLoadingLocation(false)
      return coords
    } catch (err) {
      setError(err)
    }
  }, [getCurrentPosition])

  useEffect(() => {
    if (!hasLocation) {
      updateLocation()
    }
  }, [currentLocation, hasLocation, updateLocation])

  return {
    currentLocation,
    setCurrentLocation,
    getCurrentPosition,
    updateLocation,
    hasLocation,
    isLoadingLocation,
    error,
  }
}
