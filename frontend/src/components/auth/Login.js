import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingButton from '../LoadingButton';
import LoginForm from "./LoginForm";
import sendRequest from "../../functions/SendRequest";


function LoginModal({ closeModal }) {
    const [state, setState] = React.useState({ok: null,
        value: null,
        statusText: null,
        loading: false});
    const {ok, loading, value} = state;
    const error = (value && value.error) || state.statusText;

    const startLogin = (login_data) => {
        console.log(login_data)
        //sendRequest('api/users/', {method: 'GET'}).then(response => console.log((response)));
        sendRequest('api/login/',{method: 'POST', body: JSON.stringify(login_data) })
            .then(response => {
                if (response.value.status === "200, Ok"){
                    localStorage.setItem('jwt_token', response.value.data.token);
                    localStorage.setItem('username', login_data.username);
                    localStorage.setItem('friendsNames', JSON.stringify(response.value.data.friendsUsernames));
                    setState(response)
                    window.location.reload();
                }
                else {
                    console.log(response.value);
                    setState(response.value);
                    console.log(error)
                }
        })
    };

    return <Modal show animation={false} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {ok === false &&
            <p className="alert alert-danger">Error: {error}</p>}
            {ok &&
            <p>Login successfully!</p>}
            {ok === null &&
            <LoginForm/>}
        </Modal.Body>

        {ok === null ?
            <Modal.Footer>
                <LoadingButton
                    bsStyle="primary"
                    workingMessage="Exporting"
                    disabled={loading}
                    working={loading}
                    onClick={() => startLogin({username: localStorage.getItem('username'),
                        password: localStorage.getItem('password')})}>
                    Login
                </LoadingButton>
                <Button style={{background:"#6c757d"}} onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
            : <Modal.Footer>
                <Button bsStyle="primary" onClick={closeModal}>Close</Button>
            </Modal.Footer>}
    </Modal>;
}


export default function LoginButton() {
    const [modalIsShown, setModal] = React.useState(false);
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    return <React.Fragment>
        <Button className="loginBut" onClick={openModal}>
            Login
        </Button>
        {modalIsShown &&
        <LoginModal
            closeModal={closeModal}/>}
    </React.Fragment>;
}
