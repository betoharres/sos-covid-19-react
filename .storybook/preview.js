import React from 'react'
import { addDecorator } from '@storybook/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const StorybookWrapper = (storyFn) => (
  <Router>
    <Switch>
      <Route>{storyFn()}</Route>
    </Switch>
  </Router>
)
addDecorator(StorybookWrapper)
