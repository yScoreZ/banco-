// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'sua-api-key',
  authDomain: 'seu-auth-domain',
  projectId: 'seu-project-id',
  storageBucket: 'seu-storage-bucket',
  messagingSenderId: 'seu-messaging-sender-id',
  appId: 'seu-app-id',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
