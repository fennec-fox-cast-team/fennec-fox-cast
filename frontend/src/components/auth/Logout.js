import React from 'react';
import sendRequest from '../../functions/SendRequest';
import {Button} from "react-bootstrap";

function logout() {
    sendRequest('api/logout/', {
        method: 'POST', body: {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password')
        }
     }).then(response =>{
         localStorage.setItem('username', undefined);
         localStorage.setItem('password', undefined);
         localStorage.setItem('friendsNames', undefined);
         localStorage.setItem('jwt_token', 'Item not found!');
         window.location.reload();
    })

}


export default function LogoutButton(){
    return <Button onClick={logout}>Logout</Button>
}

