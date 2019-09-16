// Import React library
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <a><i className="fas fa-code"></i>Developer's Hub</a>
      </h1>
      <ul>
        <li><a>Developers</a></li>
        <li><a>Create Account</a></li>
        <li><a>Login</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;
