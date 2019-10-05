import { GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, DELETE_POST } from '../actions/types';


export default function( state = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}, action) {
  const { type, payload } = action;
  switch (type) {

    // CREATE
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    
    // READ
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    
    // DELETE
    case DELETE_POST: 
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== payload),
      loading: false,
    }

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_LIKES:
      return  {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };

    default:
      return state;
  }
}