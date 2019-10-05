// Import React library and the Fragment component
import React, { Fragment } from 'react';

// Import HOOKS functions from react library
import { useState } from 'react';

// Import the link and redirect components from the react-router-dom
import { Link, Redirect } from 'react-router-dom';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import our action creator
import { setAlert } from '../../actions/alert';

// Import our register action creator
import { register } from '../../actions/auth';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
  const[formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');

    } else {
     
     register({ name, email, password });
    }
  }

   // Redirect if logged in
   if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }


  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

      <form className="form" onSubmit={(event) => { onSubmit(event) }}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={(event) => { onChange(event) }} required />
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={(event) => { onChange(event) }} required />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={(event) => { onChange(event) }} required />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={(event) => { onChange(event) }} required />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

      <p className="my-1">
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  sAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  setAlert: setAlert,
  register: register,
})(Register);
