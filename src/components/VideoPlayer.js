import React, { Component } from 'react'
import T from 'prop-types'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  static propTypes = {
    videoUrl: T.string.isRequired,
  }

  render() {
    return <ReactPlayer url={this.props.videoUrl} playing />
  }
}

export default VideoPlayer
