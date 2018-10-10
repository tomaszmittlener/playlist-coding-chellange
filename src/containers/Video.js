import React from 'react'
import T from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import { videoShape } from 'constants/Shapes'

import { VideoPlayer } from 'components'

class Video extends React.Component {
  static propTypes = {
    video: videoShape.isRequired,
    nextVideo: videoShape.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    loopVideo: T.bool,
  }

  static defaultProps = {
    loopVideo: false,
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
      video: { videoUrl, id, title, artist },
      loopVideo,
    } = this.props

    return (
      <div>
        <h2>{`${artist} — ${title}`}</h2>
        <VideoPlayer videoUrl={videoUrl} id={id} onEnded={this.handleOnVideoEnd} controls playing loop={loopVideo} />
      </div>
    )
  }
}

export default compose(withRouter)(Video)
