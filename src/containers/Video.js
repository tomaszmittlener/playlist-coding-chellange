import React from 'react'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { videoShape } from 'constants/Shapes'
import VideoPlayer from 'components/VideoPlayer'

class Video extends React.Component {
  static propTypes = {
    video: videoShape.isRequired,
  }

  render() {
    const {
      video: { videoUrl, title, artist },
    } = this.props

    return (
      <div>
        <h2>{title}</h2>
        <h3>{artist}</h3>
        <VideoPlayer videoUrl={videoUrl} />
      </div>
    )
  }
}

export default compose(withRouter)(Video)
