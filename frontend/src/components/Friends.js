import React from 'react';
import sendRequest from '../functions/SendRequest';

import '../resources/styles/App.css';

function getFriend(event) {

    document.getElementById("content").innerHTML = '<div>Roma Dima Vania</div>';
}

export default function Friends() {
    const friendsNames = JSON.parse(localStorage.getItem('friendsNames'))
    const friendsNamesList = friendsNames.map(friendName =>{
        return <li><button id={friendName} onClick={() => getFriend(JSON.stringify(friendName).slice(1,-1))}>{friendName}</button></li>
        }
    )
    return <div><ul>{friendsNamesList}</ul><div id="content"></div></div>
}
