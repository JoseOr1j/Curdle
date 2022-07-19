import { db } from '../firebase';
import React, { Component } from 'react'
const {collection, getDocs, where, query} = require('firebase/firestore');

class Stats extends Component
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
        const q = query(usersRef, where("uid", "==", this.props.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((u) => {
            d = u.data();
        });
        this.setState({data: d});
    }
    render()
    {
        console.log(this.state.data);
        return (
            <table>
                <h1>PLAYER STATISTICS</h1>
                <tr>Games played: {this.state.data.played}</tr>
                <tr>Win Rate: {this.state.data.win_p}</tr>
                <tr>Current streak: {this.state.data.current_streak}</tr>
                <tr>Best streak: {this.state.data.best_streak}</tr>
            </table>
        );
    }
}

export default Stats;