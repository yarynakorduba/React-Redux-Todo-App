import firebase from 'firebase';
import { firebaseAuth, firebaseRef } from '../firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


// function authenticate(provider) {
// 	return dispatch => (
// 		firebaseAuth.signInWithPopup(provider)
// 		.then(result => dispatch(signInSuccess(result)))
// 		.catch(error => dispatch(signInError(error)))

// 	);
// }
	
export function initAuth(user) {
	return {
		type: INIT_AUTH,
		payload: user
	};
}

export function signInError(error) {
	console.log("Authentification error");
	console.log(error.code);
	return {
		type: SIGN_IN_ERROR,
		payload: error
	};
}

export function signInSuccess(result) {
	console.log("Success" + result);
	return {
		type: SIGN_IN_SUCCESS,
		payload: result
	};
}



export function signInWithGithub() { //!!!
	var provider = new firebase.auth.GithubAuthProvider();
  return dispatch => (
  	firebase.auth().signInWithPopup(provider)
  	.then(result => dispatch(signInSuccess(result)))
	.catch(error => dispatch(signInError(error)))
);
}


export function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  return dispatch => (
  	firebase.auth().signInWithPopup(provider)
  	.then(result => dispatch(signInSuccess(result.user)))
	.catch(error => dispatch(signInError(error)))
);
  //return authenticate(new firebase.auth.GoogleAuthProvider());
}
 

export function signInWithTwitter() {
	var provider = new firebase.auth.TwitterAuthProvider();
  return dispatch => (
  	firebaseAuth.signInWithPopup(provider)
  	.then(result => dispatch(signInSuccess(result)))
	.catch(error => dispatch(signInError(error)))
);
	//return authenticate(new firebase.auth.TwitterAuthProvider());
}

export function signInWithFacebook() { //!!!
	var provider = new firebase.auth.FacebookAuthProvider();
  return dispatch => (
  	firebase.auth().signInWithPopup(provider)
  	.then(result => dispatch(signInSuccess(result)))
	.catch(error => dispatch(signInError(error)))
	//return authenticate(new firebase.auth.FacebookAuthProvider());
);
}



export function signOut() {
	return dispatch => {
		firebase.auth().signOut().then( () => dispatch( signOutSuccess() ) );
	};
}

export function signOutSuccess() {
	return {
		type: SIGN_OUT_SUCCESS
	};
}

// =========================EMAIL PASSWORD LOGIN=============================

// export function auth (email, pw) {
//   return firebaseAuth.createUserWithEmailAndPassword(email, pw)
//     .then(saveUser)
// }

export function auth (email, pw) {

  return dispatch => {
  		firebase.auth().createUserWithEmailAndPassword(email, pw)
    	.then(user => dispatch(saveUser(user)))
    	.then(() => dispatch(login(email, pw)))
		.catch(error => dispatch(signInError(error)));
	};
}

// export function logout () {
//   return firebase.auth().signOut()
// }

export function login (email, pw) {
  return dispatch => {firebase.auth().signInWithEmailAndPassword(email, pw)
  	.then(result => dispatch(signInSuccess(result)))
		.catch(error => dispatch(signInError(error)));
   };
}

// export function resetPassword (email) {
//   return firebaseAuth.sendPasswordResetEmail(email)
// }

export function saveUser (user) {
	//console.log('User saved');
  return dispatch => {firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
  //  .then((user) => dispatch(signInSuccess(user.user)))
    .then((user) => dispatch(user))
    
    .catch(error => dispatch(signInError(error)));
 
};
}