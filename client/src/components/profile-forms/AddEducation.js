// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import and useState from React library HOOKS!
import { useState } from 'react';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import the withRouter function from the react-router-dom
import { withRouter } from 'react-router-dom';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import our addEducation action creator
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

// Check if it is a current job then don't show date frame
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault(); 
    addEducation(formData, history);
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'/> Add any school or bootcamp that you
        have attended.
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(event) => { onSubmit(event) }}>

        <div className='form-group'>
          <input type='text' placeholder='* School or Bootcamp' name='school' value={school} onChange={(event) => onChange(event)} required />
        </div>

        <div className='form-group'>
          <input type='text' placeholder='* Degree or Certificate' name='degree' value={degree} onChange={(event) => onChange(event)}  required />
        </div>

        <div className='form-group'>
          <input type='text' placeholder='Field of Study' name='fieldofstudy' value={fieldofstudy} onChange={(event) => onChange(event)} />
        </div>

        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={(event) => onChange(event)} />
        </div>

        {/* Check if it is a current job then don't show date frame */}
        <div className='form-group'>
          <p>
            <input type='checkbox' name='current' checked={current} value={current}  onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            /> {' '} Currently Studying
          </p>
        </div>

        {/* Check if it is a current job then don't show date frame */}
        <div className='form-group'>
          <h4>To Date</h4>
          <input type='date' name='to' value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
        </div>
        
        <div className='form-group'>
          <textarea name='description' cols='30' rows='5' placeholder='Program Description' value={description} onChange={(event) => onChange(event)} />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null,{
addEducation: addEducation, 

})(withRouter(AddEducation));