import React from 'react'
import T from 'prop-types'

import { videoShape } from 'constants/Shapes'

function List({ items, itemComponent: ItemComponent }) {
  return (
    <ul>
      {items.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </ul>
  )
}

List.propTypes = {
  items: T.arrayOf(videoShape).isRequired,
  itemComponent: T.oneOfType([T.element, T.func]).isRequired,
}

export default List
