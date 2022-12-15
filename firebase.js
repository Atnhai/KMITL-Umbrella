// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiQi9D4hSQ7tpwp9dgV7m6sFgoG81XVvE',
  authDomain: 'umbrellaproject-b8de6.firebaseapp.com',
  projectId: 'umbrellaproject-b8de6',
  storageBucket: 'umbrellaproject-b8de6.appspot.com',
  messagingSenderId: '129224212410',
  appId: '1:129224212410:web:d7a47f37636a0c171ca783',
  measurementId: 'G-9L6P0XWGR6',
};

// Initialize Firebase
// let app;
// if (firebaseConfig.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }
// const auth = firebase.auth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth(app);

// export {auth};
