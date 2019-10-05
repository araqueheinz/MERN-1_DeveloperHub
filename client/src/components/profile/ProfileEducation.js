// Import React Library
import React from 'react';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import the moment library
import moment from 'moment';

// Import the React Moment library
import Moment from 'react-moment';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description } }) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{moment.utc(from)}</Moment> -{' '}
      {!to ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;