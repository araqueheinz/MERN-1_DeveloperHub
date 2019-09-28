// Import React Library and Fragment component
import React, { Fragment } from 'react';

// Import and useState from React library HOOKS!
import { useState } from 'react';

// Import the link component from the react-router-dom
import { Link } from 'react-router-dom';

// Import the withRouter function from the react-router-dom
import { withRouter } from 'react-router-dom';

// Import the connect function from react-redux library
import { connect } from 'react-redux';

// Import PropTypes from prop-types library
import PropTypes from 'prop-types'

// Import our createProfile action
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  // Lets use HOOKS
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  })

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // Destructuring so we can use them as variables
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value,});
  };

  const onSubmit = (event) => {
    event.preventDefault();

    createProfile(formData, history);
  }

  return (
    <Fragment>
     <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(event) => onSubmit(event)} >
        <div className="form-group">
          <select name="status" value={status} onChange={(event) => onChange(event)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(event) => {onChange(event)}} />
          <small className="form-text">Could be your own company or one you work for</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={(event) => {onChange(event)}} />
          <small className="form-text">Could be your own or a company website</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(event) => {onChange(event)}} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(event) => {onChange(event)}} />
          <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={(event) => {onChange(event)}}/>
          <small className="form-text">If you want your latest repos and a Github link, include your username</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(event) => {onChange(event)}}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        {/* DISPLAY SOCIAL MEDIA INPUTS */}
        <div className="my-2">
          {/* We want to toggle between showing or not social media inputs */}
          <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)}
          className="btn btn-light">Add Social Network Links</button>
          <span>Optional</span>
        </div>

        {/* If displaySocialMediaInputs === true then display this */}
        { displaySocialInputs && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(event) => {onChange(event)}}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(event) => {onChange(event)}}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(event) => {onChange(event)}}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(event) => {onChange(event)}}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(event) => {onChange(event)}}/>
          </div>
        </Fragment>}
        
        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
}

export default connect(null, {
  createProfile: createProfile,
})(withRouter(CreateProfile));