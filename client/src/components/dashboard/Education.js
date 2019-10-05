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

// Import our deleteEducation action creator
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {

  const educations = education.map(element => (
    <tr key={element._id}>

      <td>{element.school}</td>

      <td className="hide-sm">{element.degree}</td>

      <td> <Moment format="YYYY/MM/DD">{moment.utc(element.from)}</Moment> -{' '} {element.to === null ? (' Now') : 
        (<Moment format="YYYY/MM/DD">{moment.utc(element.to)}</Moment>)}
      </td>

      <td>
        <button onClick={() => { deleteEducation(element._id) }} className="btn btn-danger"> Delete </button>
      </td>

    </tr>
  ));


  return (
    <Fragment>
    <h2 className="my-2">Education Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>School</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th />
        </tr>
      </thead>
      <tbody>{educations}</tbody>
    </table>
  </Fragment>
  );
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null,{
  deleteEducation: deleteEducation,
})(Education);