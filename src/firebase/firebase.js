import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

console.log(firebaseConfig);
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();
export const firebaseRef = firebase.database().ref()