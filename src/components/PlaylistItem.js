import React from 'react'
import T from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { ms } from 'styles/helpers'
import { playlistShape } from 'constants/Shapes'
import { Emoji } from 'components/index'

const Container = styled.li`
  padding: ${ms(-1)};
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: ${ms(-5)};
  border: 1px solid transparent;
  justify-content: space-between;
  align-items: center;
  transition: border 200ms ease-in-out;
  &:hover {
    border: 1px solid ${({ theme: { colors } }) => colors.accent};
  }
`

const Item = styled(NavLink)`
  text-decoration: none;
  &.active {
    color: ${({ theme: { colors } }) => colors.accent};
    font-weight: bold;
    pointer-events: none;
  }
`

const Action = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  color: ${({ theme: colors }) => colors.primary};
  cursor: pointer;
  transition: transform 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: translateY(-4px);
  }

  &:nth-last-child {
    padding: 0;
  }
`

const Name = styled.span`
  color: ${({ theme: { colors } }) => colors.secondary};
`

const PlaylistItem = ({ item: { title, id }, onDelete }) => (
  <Container>
    <Emoji symbol={'📁️'} />
    <Item to={id}>
      <Name>{title}</Name>
    </Item>
    <Action onClick={() => onDelete(id)}>
      <Emoji symbol={'✖️️'} />
    </Action>
  </Container>
)

PlaylistItem.propTypes = {
  item: playlistShape.isRequired,
  onDelete: T.func.isRequired,
}

PlaylistItem.propTypes = {
  item: playlistShape.isRequired,
}

export default PlaylistItem
