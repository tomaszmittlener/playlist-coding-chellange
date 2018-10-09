import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ms } from 'styles/helpers'
import { videoShape } from 'constants/Shapes'

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

const Item = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h2``
const ArtistName = styled.h4``

class VideoItem extends Component {
  static propTypes = {
    item: videoShape.isRequired,
  }

  render() {
    const {
      item: { title, artist, playlist, id },
    } = this.props

    return (
      <Container>
        <Item to={`/${playlist}/${id}`}>
          <Title>{title}</Title>
          <ArtistName>{artist}</ArtistName>
        </Item>
      </Container>
    )
  }
}

export default VideoItem
