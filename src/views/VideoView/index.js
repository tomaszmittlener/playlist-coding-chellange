import React, { Component, Fragment } from 'react'
import { Playlist, Video } from 'containers'
import T from 'prop-types'
import { videoShape } from 'constants/Shapes'
import { getFilteredVideosByPlaylistId, getVideoById } from 'reducers/videos'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

class VideoView extends Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    currentVideo: videoShape,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }

  static defaultProps = {
    currentVideo: undefined,
  }

  componentDidMount = () => {
    const {
      match: {
        params: { playlistId, videoId },
      },
      history,
      videos,
    } = this.props
    if (!playlistId) {
      history.push('/')
    }
    if (playlistId && !videoId && videos.length) {
      history.push(`/${playlistId}/${videos[0].id}`)
    }
  }

  handleInputChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    })
  }
  render() {
    const {
      match: {
        params: { playlistId },
      },
      videos,
      currentVideo,
    } = this.props
    return (
      <Fragment>
        {currentVideo && <Video video={currentVideo} />}
        <Playlist videos={videos} playlistId={playlistId} />
      </Fragment>
    )
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { playlistId, videoId },
    },
  }
) => ({
  videos: getFilteredVideosByPlaylistId(state, playlistId),
  currentVideo: getVideoById(state, videoId),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VideoView)
