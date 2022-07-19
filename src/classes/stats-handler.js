import { db } from '../firebase';
import React, { useContext } from 'react'
import { AppContext } from '../App'
const {doc, collection, getDocs, updateDoc, setDoc, query, where, increment} = require('firebase/firestore');

const handle = async (uid, won, name) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty)
    {
        const newDoc = doc(collection(db, "users"));
        if (won == true)
        {
            await setDoc(newDoc, {
                uid: uid,
                played: 1,
                won: 1,
                current_streak: 1,
                best_streak: 1,
                win_p: 100,
                name: name,
            });
        }
        else
        {
            await setDoc(newDoc, {
                uid: uid,
                played: 1,
                won: 0,
                current_streak: 0,
                best_streak: 0,
                win_p: 0,
                name: name,
            });
        }
        console.log("here");
    }
    else
    {
        querySnapshot.forEach(async(u) => {
            console.log(u.id, " => ", u.data());
            const best_streak = u.data()['best_streak'];
            const curr_streak = u.data()['current_streak'];
            const games_played = u.data()['played'];
            const games_won = u.data()['won'];
            console.log(best_streak, curr_streak);
            if (won == true)
            {
                var win_p = (games_won + 1) / (games_played + 1);
                win_p = win_p.toFixed(2);
                const userRef = doc(db, "users", u.id)
                if (curr_streak >= best_streak)
                await updateDoc(userRef, {
                    played: increment(1),
                    won: increment(1),
                    current_streak: increment(1),
                    best_streak: increment(1),
                    win_p: win_p,
                });
                else
                await updateDoc(userRef, {
                    played: increment(1),
                    won: increment(1),
                    current_streak: increment(1),
                    win_p: win_p,
                });
            }
            else
            {
                var win_p = (games_won) / (games_played + 1);
                win_p = win_p.toFixed(2);
                const userRef = doc(db, "users", u.id)
                await updateDoc(userRef, {
                    played: increment(1),
                    win_p: win_p,
                    current_streak: 0,
                });
            }
            
        });
        
    }
    

}

export default handle;