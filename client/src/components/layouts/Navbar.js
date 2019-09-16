// Import React library
import React from 'react';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
       <Link to='/'>
        <i className="fas fa-code"></i>Developer's Hub
       </Link>
      </h1>
      <ul>
        <li><Link to=''>Developers</Link></li>
        <li><Link to='/register'>Create Account</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
