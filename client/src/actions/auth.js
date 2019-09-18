// Import axios library
import axios from 'axios';

// Import our setAlert action
import { setAlert } from './alert';

// Import our action types
import { REGISTER_SUCCESS, REGISTER_FAIL  } from './types';

// REGISTER USER

export const register = ({ name, email, password }) => async dispatch => {
  const body = {
    name,
    email,
    password,
  }

  try {
    // Save to the database
    const res = await axios.post('/api/users', body, { headers: { 'Content-type': 'application/json' }});
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {

    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(element => dispatch(setAlert(element.msg, 'danger')));
    } 

    dispatch({
      type: REGISTER_FAIL,
    });
  }
}

