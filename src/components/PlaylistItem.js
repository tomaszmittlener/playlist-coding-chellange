import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { ms } from 'styles/helpers'
import { playlistShape } from 'constants/Shapes'

const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme: { colors } }) => colors.secondary};
  }
`

const Title = styled(NavLink)`
  padding: ${ms(-1)} ${ms(2)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.secondary};
  &.active {
    color: ${({ theme: { colors } }) => colors.accent};
    font-weight: bold;
    pointer-events: none;
  }
`

class PlaylistItem extends Component {
  render() {
    const {
      item: { title, id },
    } = this.props

    return (
      <Container>
        <Title to={id}>{title}</Title>
      </Container>
    )
  }
}

PlaylistItem.propTypes = {
  item: playlistShape.isRequired,
}

export default PlaylistItem
