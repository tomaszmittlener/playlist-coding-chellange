import React from 'react'
import T from 'prop-types'
import { List, VideoItem } from 'components'
import { videoShape } from 'constants/Shapes'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

class Playlist extends React.Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
  }

  render() {
    const { videos } = this.props

    return (
      <Container>
        {videos.length ? <List items={videos} itemComponent={VideoItem} /> : 'This playlist is empty...'}
      </Container>
    )
  }
}

export default Playlist
