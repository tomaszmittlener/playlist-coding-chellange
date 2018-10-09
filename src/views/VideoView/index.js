import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import T from 'prop-types'
import { videoShape } from 'constants/Shapes'
import ReactRouterPropTypes from 'react-router-prop-types'

import { getFilteredVideosByPlaylistId, getVideoById, getNextVideoFromPlaylist } from 'reducers/videos'

import { Playlist, Video, AddVideoForm } from 'containers'

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`

const VideoSection = styled.section`
  display: flex;
  flex-direction: column;
`

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
      <Container>
        <VideoSection>
          {currentVideo && <Video video={currentVideo} nextVideo={nextVideo} />}
          <AddVideoForm playlistId={playlistId} />
        </VideoSection>
        <Playlist videos={videos} />
      </Container>
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
