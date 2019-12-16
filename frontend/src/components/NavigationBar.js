import React from "react";
import { NavLink } from "react-router-dom";
import LoginButton from "./auth/Login";
import LogoutButton from "./auth/Logout";

import '../resources/styles/NavigationBar.css';
import loggedIn from "../functions/LoggedIn";

const NavTab = props => {

    return (
        <NavLink className="navTab" exact to={props.to}>
            {props.label}
        </NavLink>
    );
};


const NavBar = () => {
    return (
        <div className="navBar">
            <b className="fnc">Fennec Fox Cast</b>
            <div className="buttonSet">
                <NavTab to="/" label="Main Page" />
                <NavTab to="/contact" label="Contacts" />
                {loggedIn() ?
                    <div className="navTab">
                        <div className="navTab">
                            <h3>{localStorage.getItem('username')}</h3>
                        </div>
                        <div className="navTab">
                            <LogoutButton/>
                        </div>

                    </div>
                    :
                    <div className="navTab">
                        <NavTab to="/register" label="Register"/>
                        <LoginButton />
                    </div>
                }

            </div>

        </div>
    );
};

export default NavBar;
