import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router-dom'

import { List } from 'components'
import * as VideosActions from 'actions/videos'
import { getFilteredVideos } from 'reducers/videos'
import { videoShape } from 'constants/Shapes'
import ReactRouterPropTypes from 'react-router-prop-types'

const Item = () => <div>test</div>

class Playlist extends React.Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    addVideo: T.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }

  state = {
    videoUrl: '',
    title: '',
    artist: '',
    playlist: '',
  }

  componentDidMount = () => {
    const {
      match: {
        params: { playlist, video },
      },
      history,
      videos,
    } = this.props
    if (!playlist) {
      history.push('/')
    }
    if (playlist && !video && videos.length) {
      history.push(`/${playlist}/${videos[0].id}`)
    }
  }

  handleInputChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    })
  }

  handleSubmit = e => {
    this.props.addVideo({
      videoUrl: this.state.videoUrl,
      title: this.state.title,
      artist: this.state.artist,
      playlist: this.props.match.params.playlist,
      createdAt: new Date().getTime(),
      id: uuid(),
    })
    e.preventDefault()
  }

  render() {
    const { videos } = this.props
    const { videoUrl, title, artist } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="videoUrl"
            placeholder="url"
            value={videoUrl}
            onChange={e => this.handleInputChange(e, 'videoUrl')}
          />
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={e => this.handleInputChange(e, 'title')}
          />
          <input
            type="text"
            name="artist"
            placeholder="artist"
            value={artist}
            onChange={e => this.handleInputChange(e, 'artist')}
          />
          <input type="submit" value="Submit" />
        </form>
        <List items={videos} itemComponent={Item} />
      </div>
    )
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { playlist },
    },
  }
) => ({
  videos: getFilteredVideos(state, playlist),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VideosActions, dispatch)
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Playlist)
