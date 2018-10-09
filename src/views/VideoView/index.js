import React, { Component } from 'react'
import { Playlist } from 'containers'
import T from 'prop-types'
import { videoShape } from 'constants/Shapes'
import { getFilteredVideos } from 'reducers/videos'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

class VideoView extends Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
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
    } = this.props
    return <Playlist videos={videos} playlistId={playlistId} />
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { playlistId },
    },
  }
) => ({
  videos: getFilteredVideos(state, playlistId),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VideoView)
