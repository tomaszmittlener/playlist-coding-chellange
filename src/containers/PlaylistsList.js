import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

import { List, PlaylistItem } from 'components'
import { playlistShape } from 'constants/Shapes'
import { ms } from 'styles/helpers'

const Container = styled.div`
  padding: ${ms(0)} 0;
  width: 100%;
`

class PlaylistsList extends React.Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
  }

  render() {
    const { playlists } = this.props

    return (
      <Container>
        {playlists.length ? (
          <List items={playlists} itemComponent={PlaylistItem} />
        ) : (
          'There are no playlists to display...'
        )}
      </Container>
    )
  }
}

export default PlaylistsList
