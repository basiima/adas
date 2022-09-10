import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = initializeApp ({
    apiKey: "AIzaSyBNsEhmiulrLTkP1EbcFwqrX_AO1mW2cvw",
    authDomain: "adas-file-upload-f1357.firebaseapp.com",
    projectId: "adas-file-upload-f1357",
    storageBucket: "adas-file-upload-f1357.appspot.com",
    messagingSenderId: "225256066759",
    appId: "1:225256066759:web:d1be10f4b70e40c15af8e2"
});

// Firebase storage reference
const storage = getStorage(firebaseConfig);
export default storage;