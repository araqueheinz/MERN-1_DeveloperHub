// Import combineReducers function from redux library
import { combineReducers } from 'redux';

// Import our alert reducer
import alert from './alert';

// Import our auth action creator
import auth from './auth';

// Import our profile action creator
import profile from './profile';

// Import our post action creator
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
});