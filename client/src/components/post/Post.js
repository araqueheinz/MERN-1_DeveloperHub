// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import our Spinner component
import Spinner from '../layouts/Spinner';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import our getPost action creator
import { getPost } from '../../actions/post';

// Import our PostItem component
import PostItem from '../posts/PostItem';

// Import out CommentForm component
import CommentForm from './CommentForm';

// Import our CommentItem component
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id]);

  console.log(post)

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>

       <Link to='/posts' className='btn'>
        Back To Posts
      </Link>

      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        
        {post.comments.map((comment) => { return ( <CommentItem key={comment._id} comment={comment} postId={post._id} />) }
        )}


      </div>

    </Fragment>
  );
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, {
  getPost: getPost,
})(Post);
