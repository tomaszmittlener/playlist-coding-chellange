import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

import { List, PlaylistItem } from 'components'
import { playlistShape } from 'constants/Shapes'
import { ms } from 'styles/helpers'
import { bindActionCreators, compose } from 'redux'
import * as PlaylistsActions from 'actions/playlists'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'

const Container = styled.div`
  padding: ${ms(0)} 0;
  width: 100%;
`

class PlaylistsList extends React.Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
    deletePlaylist: T.func.isRequired,
  }

  handleOnItemDelete = id => {
    this.props.deletePlaylist({ id })
  }

  render() {
    const { playlists } = this.props

    return (
      <Container>
        {playlists.length ? (
          <List items={playlists} itemComponent={PlaylistItem} onItemDelete={this.handleOnItemDelete} />
        ) : (
          'There are no playlists to display...'
        )}
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlaylistsActions, dispatch)
}

export default compose(
  withRouter,
  connect(
    () => ({}),
    mapDispatchToProps
  )
)(PlaylistsList)
