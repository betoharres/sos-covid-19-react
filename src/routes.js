import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Mapas from './pages/Mapas'
import Cadastro from './pages/Cadastro'

const Routes = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Mapas />
          </Route>
          <Route path="/cadastro">
            <Cadastro />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default Routes
