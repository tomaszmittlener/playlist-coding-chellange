import React, { Component, Fragment } from 'react'
import { Playlist, Video, AddVideoForm } from 'containers'
import T from 'prop-types'
import { videoShape } from 'constants/Shapes'
import { getFilteredVideosByPlaylistId, getVideoById, getNextVideoFromPlaylist } from 'reducers/videos'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

class VideoView extends Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    currentVideo: videoShape,
    nextVideo: videoShape,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }

  static defaultProps = {
    currentVideo: undefined,
    nextVideo: undefined,
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
      nextVideo,
    } = this.props
    return (
      <Fragment>
        {currentVideo && <Video video={currentVideo} nextVideo={nextVideo} />}
        <AddVideoForm playlistId={playlistId} />
        <Playlist videos={videos} />
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
  nextVideo: getNextVideoFromPlaylist(state, videoId, playlistId),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VideoView)
