import React from 'react'
import CasesMap from './CasesMap'
import { mock } from './CasesMap.mock'

export default {
  component: CasesMap,
  title: 'CasesMap',
}

export const Default = () => <CasesMap {...mock} />
