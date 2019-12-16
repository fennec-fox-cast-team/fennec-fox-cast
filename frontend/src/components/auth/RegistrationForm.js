import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import sendRequest from '../../functions/SendRequest';
import '../../resources/styles/App.css'

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            registrationErrors: '',
            successful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password, password_confirmation } = this.state;
        if (password !== password_confirmation){
            return;
        }
        sendRequest('api/register/', {method: 'POST', body: JSON.stringify({username, password})})
            .then(response => {
                if (response.status === 200){
                    this.setState({successful: true});
                }
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                {this.state.successful ? <Redirect to={'/'}/>
                    :
                <form className='registration_from' onSubmit={this.handleSubmit}>
                    <input
                        className='registration_username'
                        type="name"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <br/>
                    <input
                        className='registration_password'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <br/>
                    <input
                        className='registration_password'
                        type="password"
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                    <br/>
                    <button className='registration_submit' type="submit">Register</button>
                </form>}
            </div>
        );
    }
}