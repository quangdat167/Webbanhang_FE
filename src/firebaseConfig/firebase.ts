// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD1cVy5V_E-Ru81GobQMLIvt5ziahG5dco',
    authDomain: 'datnit5021.firebaseapp.com',
    projectId: 'datnit5021',
    storageBucket: 'datnit5021.appspot.com',
    messagingSenderId: '967856339742',
    appId: '1:967856339742:web:dc41c2b484e83561c8a70f',
    measurementId: 'G-0MPKCSE8DJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
