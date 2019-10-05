// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import our Spinner component
import Spinner from '../layouts/Spinner';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import our getPost action creator
import { getPosts } from '../../actions/post';

// Import our PostItem component
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading }  }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, {
  getPosts: getPosts,
})(Posts);
