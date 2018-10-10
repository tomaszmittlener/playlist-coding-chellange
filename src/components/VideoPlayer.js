import React, { Component } from 'react'
import styled from 'styled-components'
import T from 'prop-types'
import ReactPlayer from 'react-player'

const Video = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`

class VideoPlayer extends Component {
  static propTypes = {
    videoUrl: T.string.isRequired,
    onEnded: T.func,
    // playing: T.bool,
    controls: T.bool,
  }

  static defaultProps = {
    playing: false,
    controls: false,
    onEnded: () => {},
  }

  render() {
    const { onEnded, videoUrl, controls } = this.props
    return (
      <VideoContainer>
        <Video
          url={videoUrl}
          onEnded={onEnded}
          playing={false}
          controls={controls}
          width="100%"
          height="100%"
          onReady={e => console.log(e)}
        />
      </VideoContainer>
    )
  }
}

export default VideoPlayer
