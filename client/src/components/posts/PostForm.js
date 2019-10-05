// Import React Library
import React from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types';

// Import and useState from React library HOOKS!
import { useState } from 'react';

// Import our addPost action creator
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, }) => {
  const [text, setText] = useState('');

  const onSubmit = async(event) => {
    event.preventDefault(); 
    addPost({ text }); 
    setText('');
  }



  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>What's in your mind...</h3>
      </div>
      <form className='form my-1' onSubmit={(event) => { onSubmit(event) }}>
        <textarea name='text' cols='30' rows='5' placeholder='Create a post' value={text} onChange={(event) => { setText(event.target.value) }} required />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, {
  addPost: addPost,
})(PostForm);

