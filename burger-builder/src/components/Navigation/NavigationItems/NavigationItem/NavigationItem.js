import React from "react";
import PropTypes from "prop-types";

import {NavLink} from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink exact activeClassName={classes.active} to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

navigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    active: PropTypes.bool,
    children: PropTypes.node.isRequired
}

export default navigationItem;