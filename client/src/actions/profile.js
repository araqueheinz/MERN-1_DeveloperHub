// Import axios library
import axios from 'axios';

// Import our action Types
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from '../actions/types';

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

// PUT / ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch => {
  try {

    const res = await axios.put('/api/profile/experience', formData, { headers: { 'Content-Type': 'application/json'} });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// PUT / ADD EDUCATION
export const addEducation = (formData, history) => async dispatch => {
  try {

    const res = await axios.put('/api/profile/education', formData, { headers: { 'Content-Type': 'application/json'} });

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};


// DELETE / EXPERIENCE
export const deleteExperience = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// DELETE / EDUCATION
export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// DELETE / ACCOUNT & PROFILE
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

