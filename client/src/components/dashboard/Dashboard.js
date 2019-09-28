// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import our Spinner component
import Spinner from '../layouts/Spinner';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import our getCurrentProfile action
import { getCurrentProfile } from '../../actions/profile';

// Import oud DashboardAction component
import DashboardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ?  <Spinner /> : <Fragment>
    <h1 className='large text-primary'>Dashboard</h1>

    <p className='lead'>
                     {/* If user exists then show user.name */}
      <i className='fas fa-user' /> Bienvenid@ {user && user.name}
    </p>

    { profile !== null ? <Fragment>

      <DashboardActions />
      
    </Fragment> : <Fragment>
        <p>You haven't created a profile, an account yes, a profile no, please add info</p>
        <Link to='/create-profile' className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>}
  </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile: getCurrentProfile,
})(Dashboard);
