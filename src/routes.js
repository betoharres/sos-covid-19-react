import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { Header } from './components'
import { Signup, Login, Map, Symptoms } from './pages'

const Routes = () => {
  return (
    <>
      <Router>
        {!isMobile && <Header />}
        <Switch>
          <Route path="/">
            {isMobile ? <Symptoms /> : <Map />}
          </Route>
          <Route path="/cadastro">
            <Signup />
          </Route>
          <Route path="/entrar">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Routes
