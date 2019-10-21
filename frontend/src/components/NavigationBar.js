import React from "react";
import { NavLink } from "react-router-dom";
import '../resources/styles/NavigationBar.css'
import LoginButton from "./auth/Login";

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
                <NavTab to="/register" label="Register"/>
                <LoginButton />
            </div>

        </div>
    );
};

export default NavBar;
