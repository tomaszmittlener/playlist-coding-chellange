import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import { withRouter } from 'react-router-dom'

import { List, VideoItem } from 'components'
import * as VideosActions from 'actions/videos'
import { videoShape } from 'constants/Shapes'

class Playlist extends React.Component {
  static propTypes = {
    videos: T.arrayOf(videoShape).isRequired,
  }

  render() {
    const { videos } = this.props

    return (
      <div>
        <List items={videos} itemComponent={VideoItem} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VideosActions, dispatch)
}

export default compose(
  withRouter,
  connect(mapDispatchToProps)
)(Playlist)
