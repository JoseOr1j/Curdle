// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5lXpB8eijmjazTrOv5aBTiSeQ439bQ44",
  authDomain: "curdle-deee2.firebaseapp.com",
  databaseURL: "https://curdle-deee2-default-rtdb.firebaseio.com",
  projectId: "curdle-deee2",
  storageBucket: "curdle-deee2.appspot.com",
  messagingSenderId: "29689859353",
  appId: "1:29689859353:web:6180b3b58f7ec7bf0fc988",
  measurementId: "G-VYRK9JDN0J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const colRef = collection(db, 'customwords');
getDocs(colRef)
  .then((snapshot) => { 
    let custwords = []
    snapshot.docs.forEach((doc) => {
      custwords.push({ ...doc.data(), id: doc.id })
    })
    console.log(custwords)
  })
  .catch(err=> {
    console.log(err.message)
  })


export function logout() {
    return signOut(auth);
  }