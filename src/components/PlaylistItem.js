import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ms } from 'styles/helpers'
import { playlistShape } from 'constants/Shapes'

const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  box-shadow: 0 1px 0 ${({ theme: { colors } }) => lighten(0.02, colors.accent)};

  &:hover {
    box-shadow: 0 0 6px ${({ theme: { colors } }) => lighten(0.01, colors.accent)};
  }
`

const Name = styled(NavLink)`
  padding: ${ms(-1)} ${ms(2)};
  display: flex;
  align-items: center;
`

class PlaylistItem extends Component {
  render() {
    const {
      item: { title, id },
    } = this.props

    return (
      <Container>
        <Name to={id}>{title}</Name>
      </Container>
    )
  }
}

PlaylistItem.propTypes = {
  item: playlistShape.isRequired,
}

export default PlaylistItem
