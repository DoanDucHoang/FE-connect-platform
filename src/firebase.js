// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6uzdg3xodK-0G7wuI7lcPx-Kibwwz8ro',
  authDomain: 'vjbc-upload.firebaseapp.com',
  projectId: 'vjbc-upload',
  storageBucket: 'vjbc-upload.appspot.com',
  messagingSenderId: '805760380841',
  appId: '1:805760380841:web:6ec5d4c844f78c2c9e1eb8',
  measurementId: 'G-PGRG5L1KCN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
