// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import the moment library
import moment from 'moment';

// Import the React Moment library
import Moment from 'react-moment';

const Experience = ({ experience }) => {

  const experiences = experience.map(element => (
    <tr key={element._id}>

      <td>{element.company}</td>

      <td className="hide-sm">{element.title}</td>

      <td> <Moment format="YYYY/MM/DD">{moment.utc(element.from)}</Moment> -{' '} {element.to === null ? (' Now') : 
        (<Moment format="YYYY/MM/DD">{moment.utc(element.to)}</Moment>)}
      </td>

      <td>
        <button className="btn btn-danger"> Delete </button>
      </td>

    </tr>
  ));


  return (
    <Fragment>
    <h2 className="my-2">Experience Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th />
        </tr>
      </thead>
      <tbody>{experiences}</tbody>
    </table>
  </Fragment>
  );
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect()(Experience);