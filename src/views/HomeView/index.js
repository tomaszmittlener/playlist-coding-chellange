import React, { Component, Fragment } from 'react'
import T from 'prop-types'
import { PlaylistsList, AddPlaylistForm } from 'containers'
import { getAllPlaylists } from 'reducers/playlists'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { playlistShape } from 'constants/Shapes'

class HomeView extends Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
  }

  render() {
    const { playlists } = this.props
    return (
      <Fragment>
        <PlaylistsList playlists={playlists} />
        <AddPlaylistForm />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playlists: getAllPlaylists(state),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(HomeView)
