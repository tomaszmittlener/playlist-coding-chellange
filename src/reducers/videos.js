import { combineReducers } from 'redux'
import { ADD_VIDEO } from 'constants/ActionTypes'

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

export const getFilteredVideos = (state, filter) => {
  const allVideos = state.videos.allIds.map(id => state.videos.byId[id])

  return allVideos.filter(singleVideo => singleVideo.playlist === filter)
}

export default videos
