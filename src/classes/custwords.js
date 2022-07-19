import { app, db } from '../firebase';

const {doc, collection, getDoc, getDocs, updateDoc, setDoc, query, where, increment} = require('firebase/firestore');

const enterword = async (uid, newword) => {
    const usersRef = collection(db, "customwords");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const hash = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 5);
    const newDoc = doc(collection(db, "customwords"));
    await setDoc(newDoc, {
        uid: uid,
        hashid: hash,
        word: newword,
    });
    alert(`Your code is ${hash} send this to your friend for them to guess your word!`);
}
export default enterword;