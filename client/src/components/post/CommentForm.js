// Import React Library
import React from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import and useState from React library HOOKS!
import { useState } from 'react';

// Import our addComment action creator
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const onSubmit = async(event) => {
    event.preventDefault();
    addComment(postId, { text });
    setText('');
  }

  return (
    <div className='post-form'>

      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>

      <form className='form my-1' onSubmit={(event) => { onSubmit(event) } }>
        <textarea name='text' cols='30' rows='5' placeholder='What do you think?' value={text} onChange={(event) => setText(event.target.value)} required />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>

    </div>
  );
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(null, {
  addComment: addComment,
})(CommentForm);
