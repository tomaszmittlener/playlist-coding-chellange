import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router-dom'
import * as PlaylistsActions from 'actions/playlists'

class AddPlaylistForm extends React.Component {
  static propTypes = {
    addPlaylist: T.func.isRequired,
  }

  state = {
    title: '',
  }

  handleInputChange = e => {
    this.setState({
      title: e.target.value,
    })
  }

  handleSubmit = e => {
    this.props.addPlaylist({
      title: this.state.title,
      createdAt: new Date().getTime(),
      id: uuid(),
    })
    e.preventDefault()
  }

  render() {
    const { title } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="title" value={title} onChange={e => this.handleInputChange(e)} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlaylistsActions, dispatch)
}

export default compose(
  withRouter,
  connect(
    () => ({}),
    mapDispatchToProps
  )
)(AddPlaylistForm)
