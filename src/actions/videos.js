import { ADD_VIDEO, DELETE_VIDEO } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const addVideo = createAction(ADD_VIDEO)
export const deleteVideo = createAction(DELETE_VIDEO)
