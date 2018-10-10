import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ms } from 'styles/helpers'
import { videoShape } from 'constants/Shapes'

const Container = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme: { colors } }) => colors.secondary};
  }
`

const Item = styled(NavLink)`
  padding: ${ms(-1)} ${ms(2)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  &.active {
    color: ${({ theme: { colors } }) => colors.accent};
    font-weight: bold;
    pointer-events: none;
  }
`

const Name = styled.span`
  color: ${({ theme: { colors } }) => colors.secondary};
`

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
          <Name>{`${artist} — ${title}`}</Name>
        </Item>
      </Container>
    )
  }
}

export default VideoItem
