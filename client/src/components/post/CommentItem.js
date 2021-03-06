// Import React Library
import React from 'react';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import our deleteComment action creator
import { deleteComment } from '../../actions/post';

// Import the React Moment library
import Moment from 'react-moment';


const CommentItem = ({  postId, comment: { _id, text, name, avatar, user, date }, auth, deleteComment }) => {

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
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button type='button' className='btn btn-danger' onClick={() => deleteComment(postId, _id)}>
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {
  deleteComment: deleteComment,
})(CommentItem)
