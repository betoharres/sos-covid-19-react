import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { Header } from './components'
import { Signup, Login, Map, Symptoms } from './pages'

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          {isMobile ? <Symptoms /> : <Map />}
        </Route>
        <Route path="/mapa" exact>
          <Map />
        </Route>
        <Route path="/sintomas" exact>
          <Symptoms />
        </Route>
        <Route path="/cadastro">
          <Signup />
        </Route>
        <Route path="/entrar">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
