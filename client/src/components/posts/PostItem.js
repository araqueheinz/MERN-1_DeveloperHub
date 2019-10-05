// Import React Library
import React from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import the React Moment library
import Moment from 'react-moment';

// Import our addLike action creator
import { addLike } from '../../actions/post';

// Import our removeLike action creator
import { removeLike } from '../../actions/post';

// Import our deletePost action creator
import { deletePost } from '../../actions/post';


const PostItem = ({ auth, post: {  _id  , text, name, avatar, user, likes, comments, date, }, addLike, removeLike, deletePost }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'> Posted on <Moment format='YYYY/MM/DD'>{date}</Moment> </p>
      </div>

      {/* LIKE BUTTON */}
      <button type='button' className='btn btn-light' onClick={(event) => { addLike(_id) }}>
        <i className='fas fa-thumbs-up' />{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>

      {/* UNLIKE BUTTON */}
      <button type='button' className='btn btn-light' onClick={(event) => { removeLike(_id) }}>
        <i className='fas fa-thumbs-down' />
      </button>

      <Link to={`/post/${_id}`} className='btn btn-primary'>
        Discussion{' '} {comments.length > 0 && ( <span className='comment-count'>{comments.length}</span> )}
      </Link>

      {/* DELETE POST BUTTON */}
      {!auth.loading && user === auth.user._id && (
        <button type='button' className='btn btn-danger' onClick={(event) => { deletePost(_id) }}>
          <i className='fas fa-times' />
        </button>
      )}
  </div>
  )
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {
  addLike: addLike,
  removeLike: removeLike,
  deletePost: deletePost,
})(PostItem)
