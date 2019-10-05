// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import our logout action
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          Developers
        </Link>
      </li>

      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className="fas fa-user"/>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"/>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>

    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to='/profiles'>Developers</Link></li>
      <li><Link to='/register'>Create Account</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  );


  return (
    <nav className="navbar bg-yellow">
      <h1>
       <Link to='/'>
        <i className="fas fa-code"></i>Developer's Hub
       </Link>
      </h1>
      {/* If loading === false && if isAuthenticated === true then show authLinks else show guestLinks */}
      { !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks } </Fragment>) }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired, 
}

const mapStateToProp = (state) => ({
  auth: state.auth,

});

export default connect(mapStateToProp, {
  logout: logout,
})(Navbar);
