import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import { getCurrentTime } from 'utils'
import { withRouter } from 'react-router-dom'
import * as PlaylistsActions from 'actions/playlists'

import styled from 'styled-components'
import { ms } from 'styles/helpers'

const Form = styled.form`
  padding: ${ms(1)} ${ms(2)};
  border: 1px solid ${({ theme: { colors } }) => colors.accent};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
`

const Input = styled.input`
  font-family: ${({
    theme: {
      typo: { fonts },
    },
  }) => fonts.primary};
  width: 100%;
  border: none;
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

  resetFields = () => {
    this.setState({
      title: '',
    })
  }

  handleSubmit = e => {
    this.props.addPlaylist({
      title: this.state.title,
      createdAt: getCurrentTime(),
      id: uuid(),
    })
    this.resetFields()
    e.preventDefault()
  }

  render() {
    const { title } = this.state

    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <Input
          required
          type="text"
          name="name"
          placeholder="add new playlist..."
          value={title}
          onChange={e => this.handleInputChange(e)}
        />
        <SubmitButton type="submit" value="Add" />
      </Form>
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
