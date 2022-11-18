import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBYGVTI1eNSziudbKllB1zIrbtRf_s3k28",
    authDomain: "crud-practica-56c76.firebaseapp.com",
    projectId: "crud-practica-56c76",
    storageBucket: "crud-practica-56c76.appspot.com",
    messagingSenderId: "399044240690",
    appId: "1:399044240690:web:c0b8ea2d73b1deb9a8232b",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export{firebase};