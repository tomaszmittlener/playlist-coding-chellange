import React, { Component } from 'react'
import T from 'prop-types'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  static propTypes = {
    videoUrl: T.string.isRequired,
    onEnded: T.func.isRequired,
  }

  render() {
    const { onEnded, videoUrl } = this.props
    return <ReactPlayer url={videoUrl} onEnded={onEnded} playing controls />
  }
}

export default VideoPlayer
