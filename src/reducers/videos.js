import { combineReducers } from 'redux'
import { ADD_VIDEO } from 'constants/ActionTypes'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import sortBy from 'lodash/sortBy'

const video = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_VIDEO: {
      return {
        played: false,
        ...payload,
      }
    }
    default:
      return state
  }
}

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_VIDEO: {
      return {
        ...state,
        [payload.id]: video(state[payload.id], { type, payload }),
      }
    }
    default:
      return state
  }
}

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_VIDEO: {
      return [payload.id, ...state]
    }
    default:
      return state
  }
}

const videos = combineReducers({
  byId,
  allIds,
})

export const getVideoById = (state, videoId) => {
  const allVideos = state.videos.allIds.map(id => state.videos.byId[id])
  return find(allVideos, { id: videoId })
}
export const getFilteredVideosByPlaylistId = (state, playlistId) => {
  const allVideos = state.videos.allIds.map(id => state.videos.byId[id])
  const playlistVideos = allVideos.filter(singleVideo => singleVideo.playlist === playlistId)
  return sortBy(playlistVideos, ['createdAt'])
}

export const getNextVideoFromPlaylist = (state, videoId, playlistId) => {
  const playlistVideos = getFilteredVideosByPlaylistId(state, playlistId)
  const currentVideoIndex = findIndex(playlistVideos, ['id', videoId])
  if (currentVideoIndex + 1 === playlistVideos.length) {
    return playlistVideos[0]
  }
  return playlistVideos[currentVideoIndex + 1]
}

export default videos
