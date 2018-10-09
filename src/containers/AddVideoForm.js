import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router-dom'
import * as VideosActions from 'actions/videos'

class AddVideoForm extends React.Component {
  static propTypes = {
    addVideo: T.func.isRequired,
    playlistId: T.string.isRequired,
  }

  state = {
    videoUrl: '',
    title: '',
    artist: '',
    playlist: '',
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
      playlist: this.props.playlistId,
      createdAt: new Date().getTime(),
      id: uuid(),
    })
    e.preventDefault()
  }

  render() {
    const { videoUrl, title, artist } = this.state

    return (
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
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VideosActions, dispatch)
}

export default compose(
  withRouter,
  connect(
    () => ({}),
    mapDispatchToProps
  )
)(AddVideoForm)
