// Import axios library
import axios from 'axios';

// Import our setAlert action
import { setAlert } from './alert';

// Import our action types
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE  } from './types';

// Import our setAuthToken utils
import setAuthToken from '../utils/setAuthToken';

// LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  const body = {
    name,
    email,
    password,
  }

  try {
    // Save to the database
    const res = await axios.post('/api/users', body, { headers: { 'Content-type': 'application/json' } });
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
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

// LOGIN USER USER
export const login = (email, password) => async dispatch => {
  const body = {
    email,
    password,
  } 

  try {
    // Save to the database
    const res = await axios.post('/api/auth', body, { headers: { 'Content-type': 'application/json' }});
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    }); 

    dispatch(loadUser())
  } catch (error) {

    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(element => dispatch(setAlert(element.msg, 'danger')));
    } 

    dispatch({
      type: LOGIN_FAIL,
    });
  }
}

// LOGOUT USER
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};