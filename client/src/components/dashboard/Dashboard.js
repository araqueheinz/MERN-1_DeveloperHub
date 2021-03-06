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

// Import our getCurrentProfile and deleteAccount action creators
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

// Import our DashboardAction component
import DashboardActions from './DashboardActions';

// Import our Experience component
import Experience from './Experience';

// Import our Education component
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {

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
      <Experience experience={profile.experience}/>
      <Education education={profile.education}/>
      <div className='my-2'>
        <button className='btn btn-danger' onClick={() => deleteAccount()}>
          <i className='fas fa-user-minus' /> Delete My Account
        </button>
      </div>

      
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
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile: getCurrentProfile,
  deleteAccount: deleteAccount,
})(Dashboard);
