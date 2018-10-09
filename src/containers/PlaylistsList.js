import React from 'react'
import T from 'prop-types'

import { List, PlaylistItem } from 'components'
import { playlistShape } from 'constants/Shapes'

class PlaylistsList extends React.Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
  }

  render() {
    const { playlists } = this.props

    return (
      <aside>
        <List items={playlists} itemComponent={PlaylistItem} />
      </aside>
    )
  }
}

export default PlaylistsList
