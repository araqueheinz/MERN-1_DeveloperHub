// Import React library
import React from 'react';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import useEffect from React library HOOKS!
import { useEffect } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import our getCurrentProfile action
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      Dashboard
    </div>
  )
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
