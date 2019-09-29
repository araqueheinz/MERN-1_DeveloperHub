// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import our Spinner component
import Spinner from '../layouts/Spinner';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import our getProfileById action creator
import { getProfileById } from '../../actions/profile';


const Profile = ({ profile: { profile, loading }, auth, match, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);



  return (
    <Fragment>
       {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};


Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById: getProfileById,
})(Profile);