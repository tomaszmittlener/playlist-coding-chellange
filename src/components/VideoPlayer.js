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
    playing: T.bool,
    controls: T.bool,
    loop: T.bool,
    id: T.string,
  }

  static defaultProps = {
    playing: false,
    controls: false,
    loop: false,
    id: '',
    onEnded: () => {},
  }

  render() {
    const { onEnded, videoUrl, id, controls, playing, loop } = this.props
    return (
      <VideoContainer>
        <Video
          key={id}
          url={videoUrl}
          onEnded={onEnded}
          playing={playing}
          controls={controls}
          width="100%"
          height="100%"
          loop={loop}
        />
      </VideoContainer>
    )
  }
}

export default VideoPlayer
