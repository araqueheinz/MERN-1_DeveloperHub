// Import uuid package
import uuid from 'uuid';

// Import our action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    }
  });

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id,
  }), 4000);
}