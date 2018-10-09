import { combineReducers } from 'redux'
import { ADD_PLAYLIST } from 'constants/ActionTypes'

const playlist = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_PLAYLIST: {
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
    case ADD_PLAYLIST: {
      return {
        ...state,
        [payload.id]: playlist(state[payload.id], { type, payload }),
      }
    }
    default:
      return state
  }
}

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_PLAYLIST: {
      return [payload.id, ...state]
    }
    default:
      return state
  }
}

const playlists = combineReducers({
  byId,
  allIds,
})

export const getAllPlaylists = state => state.playlists.allIds.map(id => state.playlists.byId[id])

export default playlists
