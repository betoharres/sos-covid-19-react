import React from 'react'
import App from './App'
import { mock } from './App.mock'

export default {
  component: App,
  title: 'App',
}

export const Default = () => <App {...mock} />
