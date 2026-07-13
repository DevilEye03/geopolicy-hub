import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7L75XlMOdie9ec0l9UUXekvo8VfhsPyQ",
  authDomain: "geopolicy-hub.firebaseapp.com",
  projectId: "geopolicy-hub",
  storageBucket: "geopolicy-hub.firebasestorage.app",
  messagingSenderId: "1075451800900",
  appId: "1:1075451800900:web:786e02c2cc1f2511037b11",
  measurementId: "G-QM42K2WHQ0"
};

// Initialize Firebase only if config is provided and it hasn't been initialized yet
const app = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApp();
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth };
