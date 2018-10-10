import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { List, VideoItem } from 'components'
import { videoShape } from 'constants/Shapes'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import * as VideosActions from 'actions/videos'

const Container = styled.div`
  width: 100%;
`

class Playlist extends React.Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
    deleteVideo: T.func.isRequired,
  }

  handleOnItemDelete = id => {
    this.props.deleteVideo({ id })
  }

  render() {
    const { videos } = this.props

    return (
      <Container>
        {videos.length ? (
          <List items={videos} itemComponent={VideoItem} onItemDelete={this.handleOnItemDelete} />
        ) : (
          'This playlist is empty...'
        )}
      </Container>
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
)(Playlist)
