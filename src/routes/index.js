import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeView, VideoView } from 'views'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/:playlistId?/:videoId?" exact component={VideoView} />
      </Switch>
    </Router>
  )
}

export default Routes
