// Import our action types
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

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
    
    default:
      return state;
  }

};