import './Leaderboard.css'
import { db } from '../firebase';
import React, { Component } from 'react'
const {collection, getDocs, limit, query, orderBy} = require('firebase/firestore');

class LeaderBoard extends Component
{
    constructor() 
    {
        super();
        this.state = { data: [] };
    }
    async componentDidMount()
    {
        var d = [];
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("won", "desc"), orderBy("win_p", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((u) => {
            d.push(u.data());
        });
        this.setState({data: d});
    }
    render()
    {
        return (
            <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Games Won</th>
                <th>Win Rate</th>
                </tr>
            </thead>
            <tbody>
                {this.state.data.map(item => {
                return (
                    <tr key={item.uid}>
                    <td>{ item.name }</td>
                    <td>{ item.won }</td>
                    <td>{ item.win_p }</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
          );
    }
}

export default LeaderBoard;