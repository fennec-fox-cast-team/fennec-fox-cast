import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingButton from '../LoadingButton';
import LoginForm from "./LoginForm";
import axios from "axios";
import {sendRequest} from "../../functions/SendRequest";


function LoginModal({ articleIds, closeModal}) {
    const [state, setState] = React.useState({ok: null,
        value: null,
        statusText: null,
        loading: false});
    const {ok, loading, value} = state;
    const error = (value && value.error) || state.statusText;

    const startExport = () => {
        sendRequest('https://google.com',{method: 'GET'}).then(response => console.log(response))
    };

    return <Modal show animation={false} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Export articles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginForm/>
        </Modal.Body>
        {ok === null ?
            <Modal.Footer>
                <LoadingButton
                    bsStyle="primary"
                    workingMessage="Exporting"
                    disabled={loading}
                    working={loading}
                    onClick={startExport}>
                    Login
                </LoadingButton>
                <Button style={{background:"#6c757d"}} onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
            : <Modal.Footer>
                <Button bsStyle="primary" onClick={closeModal}>Close</Button>
            </Modal.Footer>}
    </Modal>;
}


export default function LoginButton({ articleIds }) {
    const [modalIsShown, setModal] = React.useState(false);
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    return <React.Fragment>
        <Button className="loginBut" onClick={openModal}>
            Login
        </Button>
        {modalIsShown &&
        <LoginModal
            articleIds={[]}
            closeModal={closeModal}/>}
    </React.Fragment>;
}
