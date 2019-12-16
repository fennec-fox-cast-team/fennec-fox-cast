import React from 'react';
import sendRequest from '../functions/SendRequest';

import '../resources/styles/App.css';

function getFriend(event) {
    document.getElementById("content").innerHTML = '<div>Roma Dima Vania</div>';
}

function Friendsa() {

    const friendsNames = JSON.parse(localStorage.getItem('friendsNames'))
    const friendsNamesList = friendsNames.map(friendName =>{
        return <li><button id={friendName} onClick={() => getFriend(JSON.stringify(friendName).slice(1,-1))}>{friendName}</button></li>
        }
    ) && <p>sorry</p>;
    return <div><ul>{friendsNamesList}</ul><div id="content"/></div>
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }



    render() {
        return (
            <div>
                <h1>Привет, мир!</h1>
                <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
export default Friends;