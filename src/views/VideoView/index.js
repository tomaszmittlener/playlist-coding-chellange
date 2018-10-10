import React, { Component } from 'react'
import T from 'prop-types'
import styled from 'styled-components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { ms } from 'styles/helpers'

import { playlistShape, videoShape } from 'constants/Shapes'
import ReactRouterPropTypes from 'react-router-prop-types'

import { getFilteredVideosByPlaylistId, getVideoById, getNextVideoFromPlaylist } from 'reducers/videos'
import { getPlaylistById } from 'reducers/playlists'

import { Playlist, Video, AddVideoForm } from 'containers'
import { Header } from 'components'

const Container = styled.div`
  padding: ${ms(0)} 0;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  display: grid;
  grid-template-columns: 90%;
  grid-gap: ${ms(2)};

  @media (min-width: ${({ theme: { mq } }) => `${mq.s}px`}) {
    grid-template-columns: 70%;
    padding: ${ms(5)} 0;
  }

  @media (min-width: ${({ theme: { mq } }) => `${mq.m}px`}) {
    grid-template-columns: ${ms(19)} ${ms(17)};
  }
`

const BackButton = styled(NavLink)`
  text-decoration: none;
  width: auto;
`

const VideoPlaceholder = styled.div`
  margin: ${ms(3)} 0;
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
    // redirect to home if playlist doesn't exist
    if (!playlistId || !playlist) {
      history.push('/')
    }
    // play first video from playlist if video url is wrong
    if ((playlistId && !videoId && videos.length) || (playlistId && !currentVideo && videos.length)) {
      history.push(`/${playlistId}/${videos[0].id}`)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      match: {
        params: { playlistId },
      },
    } = this.props
    // initialize playlist on first video added
    if (!prevProps.videos.length && this.props.videos.length) {
      return history.push(`/${playlistId}/${this.props.videos[0].id}`)
    }
    // back to playlist if all videos deleted
    if (prevProps.currentVideo && !this.props.currentVideo && !this.props.videos.length) {
      return history.push(`/${playlistId}`)
    }
    // play first video from playlist if current video deleted
    if (prevProps.currentVideo && !this.props.currentVideo) {
      return history.push(`/${playlistId}/${this.props.videos[0].id}`)
    }
    return null
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
        <section>
          <BackButton to={'/'}>
            <Header label={'to playlists'} emoji={'🔙️'} />
          </BackButton>
          {currentVideo ? (
            <Video video={currentVideo} nextVideo={nextVideo} loopVideo={videos.length === 1} />
          ) : (
            <VideoPlaceholder>Add your first video to start the playlist...</VideoPlaceholder>
          )}
          <Header label={'Add video'} emoji={'➕️'} />
          <AddVideoForm playlistId={playlistId} />
        </section>
        <aside>
          <Header label={playlist.title} emoji={'️📁️️'} />
          <Playlist videos={videos} />
        </aside>
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
