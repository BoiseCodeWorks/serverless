import firebase from 'firebase/app'
import 'firebase/firestore'
let config = {
  apiKey: "AIzaSyCKcVxbEfRLm0tY9-pa5q-HY3Hp5YJwrc0",
  authDomain: "serverless-2f761.firebaseapp.com",
  databaseURL: "https://serverless-2f761.firebaseio.com",
  projectId: "serverless-2f761",
  storageBucket: "",
  messagingSenderId: "355482981360"
};

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()
const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);


export default { firebaseApp, firestore }