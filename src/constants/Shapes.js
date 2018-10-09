import T from 'prop-types'

export const videoShape = T.shape({
  id: T.string.isRequired,
  title: T.string.isRequired,
  artist: T.string.isRequired,
  playlist: T.string.isRequired,
  createdAt: T.number.isRequired,
  videoUrl: T.string.isRequired,
})
