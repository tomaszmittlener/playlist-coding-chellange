import { ADD_PLAYLIST, DELETE_PLAYLIST } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const addPlaylist = createAction(ADD_PLAYLIST)
export const deletePlaylist = createAction(DELETE_PLAYLIST)
