import { combineReducers } from 'redux'
import { ADD_PLAYLIST, DELETE_PLAYLIST } from 'constants/ActionTypes'
import find from 'lodash/find'

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
    case DELETE_PLAYLIST: {
      return Object.keys(state).reduce((acc, key) => {
        if (key !== payload.id) {
          acc[key] = state[key]
        }
        return acc
      }, {})
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
    case DELETE_PLAYLIST: {
      return state.filter(id => id !== payload.id)
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

export const getPlaylistById = (state, playlistId) => {
  const allPlaylists = getAllPlaylists(state)
  return find(allPlaylists, { id: playlistId })
}
export default playlists
