import firebase from 'firebase';

const config = {
   apiKey: 'AIzaSyDlzqJWvgfszi0akRrLTsW3lpJDhy5X2KE',
   authDomain: 'get-your-streamer.firebaseapp.com',
   databaseURL: 'https://get-your-streamer.firebaseio.com',
   storageBucket: 'get-your-streamer.appspot.com',
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
