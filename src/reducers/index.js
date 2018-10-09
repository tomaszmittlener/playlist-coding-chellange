import { combineReducers } from 'redux'
import videos from './videos'
import playlists from './playlists'

const rootReducer = combineReducers({
  videos,
  playlists,
})

export default rootReducer
