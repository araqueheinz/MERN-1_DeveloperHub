// Import React library
import React from 'react';

// Import the Route, and Redirect components from 'react-router-dom library
import { Route, Redirect } from 'react-router-dom';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import the connect function from react-redux library
import { connect } from 'react-redux';

const PrivateRouting = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route {...rest} render={ (props) => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
);

PrivateRouting.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRouting);
