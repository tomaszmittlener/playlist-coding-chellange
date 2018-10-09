import React from 'react'
import T from 'prop-types'
import { List, VideoItem } from 'components'
import { videoShape } from 'constants/Shapes'

class Playlist extends React.Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
  }

  render() {
    const { videos } = this.props

    return (
      <aside>
        <List items={videos} itemComponent={VideoItem} />
      </aside>
    )
  }
}

export default Playlist
