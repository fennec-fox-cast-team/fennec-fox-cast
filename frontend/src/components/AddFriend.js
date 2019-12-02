import React from "react";
import sendRequest from "../functions/SendRequest";

function addFriend(name){
    sendRequest('/api/addFriendToUser/', {method: 'POST',
        body: JSON.stringify({username: localStorage.username, token: localStorage.jwt_token, friendName: name})
    }).then(response => {
        if (response.value.status === '200, Ok'){
            alert('Friend, ' + name + ' added!\nRefresh the page please.')
        }
        else {
            alert(response.value.data)
        }
    })
}

function deleteFriend(name){
    sendRequest('/api/deleteFriend/', {method: 'DELETE',
        body: JSON.stringify({username: localStorage.username, token: localStorage.jwt_token, friendName: name})
    }).then(response => {
        if (response.value.status === '200, Ok'){
            alert('Friend, ' + name + ' deleted!\nRefresh the page please.')
        }
        else {
            alert(response.value.data)
        }
    })
}

class AddFriends extends React.Component {


    render() {
        return <div>
            <p>Input friend's name to add:</p>
            <input id={'friendName'} ref={'friendName'}/>
            <br/>
            <button onClick={() => addFriend(this.refs.friendName.value)}>Add</button>
            <button onClick={() => deleteFriend(this.refs.friendName.value)}>Delete</button>
            <br/>
            <br/>
        </div>
    }
}

export default AddFriends;