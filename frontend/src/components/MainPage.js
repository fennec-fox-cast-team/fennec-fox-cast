import React from "react";
import sendRequest from "../functions/SendRequest";
import AddFriend from  '../components/AddFriend'


 class MainPage extends React.Component{
     state = {
         response: null,
         friends_list: []
     };


     componentWillMount() {
         this._asyncRequest = sendRequest('/api/GetAllFriendsForUser/', {method: 'POST',
             body: JSON.stringify({username: localStorage.username, token: localStorage.jwt_token})
         }).then(
             response => {
                 if (response.status === 200){
                     this._asyncRequest = null;
                     const friends_list = response.value.data;
                     this.setState({friends_list});
                 }

             }
         );
     }

     componentWillUnmount() {
         if (this._asyncRequest) {
             this._asyncRequest.cancel();
         }
     }
     render() {
                 if (this.state.response === null) {
                     let listFriends;
                     if (this.state.friends_list.length === 0){
                         listFriends = <div>No friends yet...</div>
                     } else {
                         listFriends= this.state.friends_list.map((friend) =>
                             <li>{friend}</li>
                         );
                     }

                     return <div><AddFriend/>{listFriends}</div>
                 // Render loading state ...
                } else {
                     return <div><AddFriend/>Loading, please wait!</div>
                }
     }
}


export default MainPage