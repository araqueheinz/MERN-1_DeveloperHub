// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the BrowserRouter, Route, and, Switch components from 'react-router-dom library
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import our css styles to our app
import './App.css';

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

// REDUX //

// Import provider component from react-redux library
import { Provider } from 'react-redux';

// Import our redux store
import store from './store';

const App = () => {
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
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter> 
    </Provider>
  );
}

export default App;
