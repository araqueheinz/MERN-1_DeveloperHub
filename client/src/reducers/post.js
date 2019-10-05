import { GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, ADD_POST, ADD_COMMENT, DELETE_POST, REMOVE_COMMENT, } from '../actions/types';


export default function( state = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}, action) {
  const { type, payload } = action;
  switch (type) {

    // CREATE POST
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    
    // READ ONE POST
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };

    // READ ALL POSTS
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    
    // DELETE POST
    case DELETE_POST: 
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== payload),
      loading: false,
    }

    // CREATE COMMENT
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      }
    
    // DELETE COMMENT
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
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