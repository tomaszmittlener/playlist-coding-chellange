import React, { Component } from 'react'
import T from 'prop-types'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  static propTypes = {
    videoUrl: T.string.isRequired,
    onEnded: T.func,
    playing: T.bool,
    controls: T.bool,
  }

  static defaultProps = {
    playing: false,
    controls: false,
    onEnded: () => {},
  }

  render() {
    const { onEnded, videoUrl, controls, playing } = this.props
    return <ReactPlayer url={videoUrl} onEnded={onEnded} playing={playing} controls={controls} />
  }
}

export default VideoPlayer
