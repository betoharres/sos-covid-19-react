import React, { useEffect } from 'react'
import { CasesMap } from '../../components'

const Map = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <CasesMap />
}

export default Map
