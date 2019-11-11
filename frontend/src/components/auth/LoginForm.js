import React, { Component } from "react";
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.type === 'text'){
            localStorage.setItem('username', event.target.value)
        }
        if (event.target.type === 'password'){
            localStorage.setItem('password', event.target.value)
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const {username, password} = this.state;
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required={true}
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                </form>
            </div>
        );
    }
}