import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { getCurrentTime } from 'utils'
import { withRouter } from 'react-router-dom'
import * as VideosActions from 'actions/videos'
import styled from 'styled-components'
import { ms } from 'styles/helpers'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${ms(2)};
  input:last-of-type {
    margin: ${ms(0)} 0 0 0;
  }
`

const Input = styled.input`
  padding: ${ms(0)} 0;
  font-family: ${({
    theme: {
      typo: { fonts },
    },
  }) => fonts.primary};
  border: none;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.accent};
  outline: none;
  font-size: ${ms(0)};
  height: auto;
  line-height: 1;
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.accent};
  }
`

const SubmitButton = styled.input`
  display: inline-block;
  background-color: ${({ theme: { colors } }) => colors.secondary};
  color: ${({ theme: { colors } }) => colors.primary};
  border: none;
  margin: 0;
  padding: ${ms(0)};
  line-height: 1;
  transition: background-color 300ms ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme: { colors } }) => colors.accent};
  }
`

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

  resetFields = () => {
    this.setState({
      videoUrl: '',
      title: '',
      artist: '',
      playlist: '',
    })
  }

  handleSubmit = e => {
    this.props.addVideo({
      videoUrl: this.state.videoUrl,
      title: this.state.title,
      artist: this.state.artist,
      playlist: this.props.playlistId,
      createdAt: getCurrentTime(),
      id: uuid(),
    })
    this.resetFields()
    e.preventDefault()
  }

  render() {
    const { videoUrl, title, artist } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="videoUrl"
          placeholder="url"
          value={videoUrl}
          required
          onChange={e => this.handleInputChange(e, 'videoUrl')}
        />
        <Input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          required
          onChange={e => this.handleInputChange(e, 'title')}
        />
        <Input
          type="text"
          name="artist"
          placeholder="artist"
          value={artist}
          required
          onChange={e => this.handleInputChange(e, 'artist')}
        />
        <SubmitButton type="submit" value="Submit" />
      </Form>
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
