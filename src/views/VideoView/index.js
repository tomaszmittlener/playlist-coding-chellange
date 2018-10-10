import React, { Component } from 'react'
import T from 'prop-types'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ms } from 'styles/helpers'

import { playlistShape, videoShape } from 'constants/Shapes'
import ReactRouterPropTypes from 'react-router-prop-types'

import { getFilteredVideosByPlaylistId, getVideoById, getNextVideoFromPlaylist } from 'reducers/videos'
import { getPlaylistById } from 'reducers/playlists'

import { Playlist, Video, AddVideoForm } from 'containers'

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  display: grid;
  grid-template-columns: 90%;
  grid-gap: ${ms(2)};

  @media (min-width: ${({ theme: { mq } }) => `${mq.s}px`}) {
    grid-template-columns: 70%;
  }

  @media (min-width: ${({ theme: { mq } }) => `${mq.m}px`}) {
    grid-template-columns: ${ms(19)} ${ms(17)};
  }
`

const Title = styled.h2`
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.accent};
`

class VideoView extends Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    currentVideo: videoShape,
    nextVideo: videoShape,
    playlist: playlistShape,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }

  static defaultProps = {
    currentVideo: undefined,
    nextVideo: undefined,
    playlist: undefined,
  }

  componentDidMount = () => {
    const {
      match: {
        params: { playlistId, videoId },
      },
      history,
      videos,
      playlist,
      currentVideo,
    } = this.props
    if (!playlistId || !playlist) {
      history.push('/')
    }
    if ((playlistId && !videoId && videos.length) || (playlistId && !currentVideo && videos.length)) {
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
      playlist,
    } = this.props
    if (!playlist) {
      return null
    }
    return (
      <Container>
        <div>
          {currentVideo && <Video video={currentVideo} nextVideo={nextVideo} />}
          <AddVideoForm playlistId={playlistId} />
        </div>
        <div>
          <Title>{playlist.title}</Title>
          <Playlist videos={videos} />
        </div>
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
  playlist: getPlaylistById(state, playlistId),
  currentVideo: getVideoById(state, videoId),
  nextVideo: getNextVideoFromPlaylist(state, videoId, playlistId),
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VideoView)
