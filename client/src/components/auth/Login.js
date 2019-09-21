// Import React library and the Fragment component
import React, { Fragment } from 'react';

// Import HOOKS functions from react library
import { useState } from 'react';

// Import the link and redirect component from the react-router-dom
import { Link, Redirect } from 'react-router-dom';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import our login action
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const[formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }


  return (
    <Fragment>
      <h1 className="large text-primary">Log In </h1>
      <p className="lead"><i className="fas fa-user"></i> Log In Your Account</p>

      <form className="form" onSubmit={(event) => { onSubmit(event) }}>

        <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={(event) => { onChange(event) }} required />

        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={(event) => { onChange(event) }} required />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to='/register'>Create Account</Link>
      </p>
    </Fragment>
  )
}


Login.propTypes = {
 login: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  login: login,
})(Login);
