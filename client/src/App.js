// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the BrowserRouter, Route, and, Switch components from 'react-router-dom library
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import our css styles to our app
import './App.css';

// Import our media queries css styles to our app
import './Queries.css';

/*  ///////////////////////////////////////////////
   //              * COMPONENTS *               //
  /////////////////////////////////////////////// */

// Import our Navbar component
import Navbar from './components/layouts/Navbar';

// Import our Landing component
import Landing from './components/layouts/Landing';

// Import our Register component
import Register from './components/auth/Register';

// Import our Alert component
import Alert from './components/layouts/Alert';

// Import our Login component
import Login from './components/auth/Login';

// Import our Dashboard component
import Dashboard from './components/dashboard/Dashboard';

// Import our PrivateRouting component
import PrivateRouting from './components/routing/PrivateRouting';

// Import our CreateProfile component
import CreateProfile from './components/profile-forms/CreateProfile';

// Import our EditProfile component
import EditProfile from './components/profile-forms/EditProfile';

// Import our AddExperience component
import AddExperience from './components/profile-forms/AddExperience';

// Import our AddEducation component
import AddEducation from './components/profile-forms/AddEducation';

// Import our Profiles component
import Profiles from './components/profiles/Profiles';

// Import our Profile component
import Profile from './components/profile/Profile';

/*  ///////////////////////////////////////////////
   //              * COMPONENTS *               //
  /////////////////////////////////////////////// */

// Import our setAuthToken utils
import setAuthToken from './utils/setAuthToken';

// Import our loadUser action
import { loadUser } from './actions/auth';

/////// REDUX ////////

// Import provider component from react-redux library
import { Provider } from 'react-redux';

// Import our redux store
import store from './store';

/////////////////////

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing}/>
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRouting exact path='/dashboard' component={Dashboard} />
              <PrivateRouting exact path='/create-profile' component={CreateProfile} />
              <PrivateRouting exact path='/edit-profile' component={EditProfile} />
              <PrivateRouting exact path='/add-experience' component={AddExperience} />
              <PrivateRouting exact path='/add-education' component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter> 
    </Provider>
  );
}

export default App;
