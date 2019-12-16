import React from "react";

export default function loggedIn() {
    if (localStorage.getItem('jwt_token') !== 'Item not found!'){
        return true;
    }
    return false;
}