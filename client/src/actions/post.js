// Import axios library
import axios from 'axios';

// Import our setAlert action
import { setAlert } from './alert';

// Import our action types
import { GET_POSTS, UPDATE_LIKES, POST_ERROR, DELETE_POST, ADD_POST  } from './types';

// ADD LIKE
export const addLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// REMOVE LIKE
export const removeLike = (postId) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// POST / CREATE POST
export const addPost = (formData) => async dispatch => {

  try {
    // Save to the database
    const res = await axios.post('/api/posts', formData, { headers: { 'Content-type': 'application/json' } });

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// GET / READ POSTS
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
    
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
    
  }
}

// DELETE POST
export const deletePost = (postId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert('Post Deleted', 'success'));

  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
