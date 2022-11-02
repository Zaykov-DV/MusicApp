import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCUQbpCsu2rNEIFJOLg9Xa_rDIkIY8ZAak",
  authDomain: "musicapp-40ea4.firebaseapp.com",
  projectId: "musicapp-40ea4",
  storageBucket: "musicapp-40ea4.appspot.com",
  messagingSenderId: "121073033778",
  appId: "1:121073033778:web:de564cd0c491d04192d22b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()