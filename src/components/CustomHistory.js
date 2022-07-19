import './CustomHistory.css'
import { db } from '../firebase';
import React, { Component } from 'react'
const {collection, getDocs, limit, query, where} = require('firebase/firestore');

class CustomHistory extends Component
{
    constructor() 
    {
        super();
        this.state = { data: [] };
    }
    async componentDidMount()
    {
        var d = [];
        const customRef = collection(db, "customwords");
        const q = query(customRef, where("uid", "==", this.props.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((u) => {
            d.push(u.data());
        });
        this.setState({data: d});
        console.log(d);
    }
    render()
    {
        return (
            <table class="custHist-table">
            <caption class="custHist-caption">Custom Words History</caption>
            <thead>
                <tr>
                <th class="custHist-th">Word</th>
                <th class="custHist-th">Hash</th>
                </tr>
            </thead>
            <tbody>
                {this.state.data.map(item => {
                return (
                    <tr key={item.hashid}>
                    <td class="custHist-td">{ item.word }</td>
                    <td class="custHist-td">{ item.hashid }</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
          );
    }
}

export default CustomHistory;