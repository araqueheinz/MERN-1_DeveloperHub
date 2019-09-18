// Import combineReducers function from redux library
import { combineReducers } from 'redux';

// Import our alert reducer
import alert from './alert';

// Import our register action creator
import auth from './auth';

export default combineReducers({
  alert,
  auth,
});