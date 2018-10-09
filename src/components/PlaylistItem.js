import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ms } from 'styles/helpers'
import { playlistShape } from 'constants/Shapes'

const Container = styled.li`
  padding: ${ms(-1)} ${ms(2)};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${ms(2)};
  box-shadow: 0 1px 0 ${({ theme: { colors } }) => lighten(0.02, colors.accent)};

  &:hover {
    box-shadow: 0 0 6px ${({ theme: { colors } }) => lighten(0.01, colors.accent)};
  }
`

const Name = styled(Link)`
  display: flex;
  align-items: center;
`

class PlaylistItem extends Component {
  render() {
    const {
      item: { title },
    } = this.props

    return (
      <Container>
        <Name to={title}>{title}</Name>
      </Container>
    )
  }
}

PlaylistItem.propTypes = {
  item: playlistShape.isRequired,
}

export default PlaylistItem
