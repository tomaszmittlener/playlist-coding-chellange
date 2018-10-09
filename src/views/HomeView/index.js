import React, { Component } from 'react'
import T from 'prop-types'
import { PlaylistsList, AddPlaylistForm } from 'containers'
import { getAllPlaylists } from 'reducers/playlists'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import { playlistShape } from 'constants/Shapes'
import styled from 'styled-components'

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

class HomeView extends Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
  }

  render() {
    const { playlists } = this.props
    return (
      <Container>
        <AddPlaylistForm />
        <PlaylistsList playlists={playlists} />
      </Container>
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
