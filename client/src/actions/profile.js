// Import axios library
import axios from 'axios';

// Import our action Types
import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

// Import our setAlert action
import { setAlert } from './alert';

// GET / READ PROFILE
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}


// POST / CREATE PROFILE / EDIT
export const createProfile = (
  formData,
  // We want to redirect the user after we submit the form, so we use the history object to push to a different client side route.
  history,
  // Parameter to determine if it is a create or edit profile.
  edit = false,
) => async dispatch => {
  try {
    // Make the api call
    const res = await axios.post('/api/profile/', formData, { headers: { 'Content-type': 'application/json' } })

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    
    if (!edit) {
      // Redirect
      history.push('/dashboard');
    }

  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(element => dispatch(setAlert(element.msg, 'danger')));
    } 
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }

}

