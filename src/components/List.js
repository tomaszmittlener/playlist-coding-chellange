import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

import { listItemShape } from 'constants/Shapes'

const Container = styled.ul`
  padding: 0;
`

function List({ items, itemComponent: ItemComponent, onItemDelete }) {
  return (
    <Container>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} onDelete={onItemDelete} />
      ))}
    </Container>
  )
}

List.propTypes = {
  items: T.arrayOf(listItemShape).isRequired,
  itemComponent: T.oneOfType([T.element, T.func]).isRequired,
  onItemDelete: T.func.isRequired,
}

export default List
