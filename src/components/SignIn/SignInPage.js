import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authActions } from '../../auth';
import Button from '../Button/Button';
// import { Alert } from 'react-bootstrap';
import EmailPasswordSignIn from '../EmailPasswordSignIn';

import './SignInPage.css';

//===========================

const SignInPage = ({ signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook, auth, login, authenticated}) => {
	console.log("SignIn auth" + authenticated);
  return (
	<div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <Button className="sign-in__button" onClick={signInWithGithub}>GitHub</Button>
        <Button className="sign-in__button" onClick={signInWithGoogle}>Google</Button>
        <Button className="sign-in__button" onClick={signInWithTwitter}>Twitter</Button>
        <Button className="sign-in__button" onClick={signInWithFacebook}>Facebook</Button>
      </div>
      <div className="g-col">
      <EmailPasswordSignIn handleSubmit={login}/>
      <h1 className="sign-in__heading">Sign up</h1>
      <EmailPasswordSignIn handleSubmit={auth}/>

      
      </div>
	</div>
	);
};

SignInPage.propTypes = {  //to check the needed types
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired

};

//============================CONNECT===============================

const mapDispatchToProps = {
	signInWithGithub: authActions.signInWithGithub,
 	signInWithGoogle: authActions.signInWithGoogle,
 	signInWithTwitter: authActions.signInWithTwitter,
	signInWithFacebook: authActions.signInWithFacebook,
  auth: authActions.auth,
  login: authActions.login

};

export default withRouter(
	connect(null, mapDispatchToProps)(SignInPage)
	);