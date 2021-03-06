import React from 'react';
import { connect } from 'react-redux';
import { signup, loginDemo, clearErrorsThunk } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import SignupForm from './signup_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    loginLink: <Link to="/login" className="link"><span>Log in</span></Link>
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signupUser: user => dispatch(signup(user)),
    loginDemoUser: () => dispatch(loginDemo()),
    clearErrors: () => dispatch(clearErrorsThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);