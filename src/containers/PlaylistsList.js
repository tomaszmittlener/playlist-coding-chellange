import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { withRouter } from 'react-router-dom'

import { List } from 'components'
import * as PlaylistsActions from 'actions/playlists'
import { getAllPlaylists } from 'reducers/playlists'
import { playlistShape } from 'constants/Shapes'

const Item = () => <div>test</div>

class PlaylistsList extends React.Component {
  static propTypes = {
    playlists: T.arrayOf(playlistShape).isRequired,
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
    const { playlists } = this.props
    const { title } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="title" value={title} onChange={e => this.handleInputChange(e)} />
          <input type="submit" value="Submit" />
        </form>
        <List items={playlists} itemComponent={Item} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playlists: getAllPlaylists(state),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlaylistsActions, dispatch)
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlaylistsList)
