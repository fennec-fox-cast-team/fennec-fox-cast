import React from "react";
import { NavLink } from "react-router-dom";
import '../resources/styles/NavigationBar.css'

const NavTab = props => {

    return (
        <NavLink exact to={props.to}>
            {props.label}
        </NavLink>
    );
};


const NavBar = () => {

    return (
        <div className="navTab">
            <b>Fennec Fox Cast</b>
            <div className="navTab">
                <NavTab to="/" label="Main Page" />
                <NavTab to="/contact" label="Contacts" />
            </div>
        </div>
    );
};

export default NavBar;
