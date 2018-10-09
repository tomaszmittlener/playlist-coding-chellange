import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import ReactRouterPropTypes from 'react-router-prop-types'
import { videoShape } from 'constants/Shapes'

import VideoPlayer from 'components/VideoPlayer'

class Video extends React.Component {
  static propTypes = {
    video: videoShape.isRequired,
    nextVideo: videoShape.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  }

  handleOnVideoEnd = () => {
    const {
      history,
      match: {
        params: { playlistId },
      },
      nextVideo,
    } = this.props
    history.push(`/${playlistId}/${nextVideo.id}`)
  }

  render() {
    const {
      video: { videoUrl, title, artist },
    } = this.props

    return (
      <div>
        <h2>{title}</h2>
        <h3>{artist}</h3>
        <VideoPlayer videoUrl={videoUrl} onEnded={this.handleOnVideoEnd} />
      </div>
    )
  }
}

export default compose(withRouter)(Video)
