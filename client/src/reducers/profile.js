// Import our action types
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE } from '../actions/types';

// Using a Switch Statement Most common practice
export default (state = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}, action) => {

  const { type, payload } =  action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      }
    default:
      return state;
  }

};