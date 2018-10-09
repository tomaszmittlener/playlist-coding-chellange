import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeView, PlaylistView } from 'views'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/:playlist?" exact component={PlaylistView} />
      </Switch>
    </Router>
  )
}

export default Routes
