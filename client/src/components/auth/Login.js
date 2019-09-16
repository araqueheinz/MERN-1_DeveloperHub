// Import React library and the Fragment component
import React, { Fragment } from 'react';

// Import HOOKS functions from react library
import { useState } from 'react';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

const Login = () => {
  const[formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('Login, Success');
    
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
        
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to='/register'>Create Account</Link>
      </p>
    </Fragment>
  )
}

export default Login;
