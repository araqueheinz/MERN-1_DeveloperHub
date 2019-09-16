// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import our css styles to our app
import './App.css';

// Import our Navbar component
import Navbar from './components/layouts/Navbar';

// Import our Landing component
import Landing from './components/layouts/Landing';

const App = () => {
  return (
   <Fragment>
     <Navbar />
     <Landing />
   </Fragment>
  );
}

export default App;
