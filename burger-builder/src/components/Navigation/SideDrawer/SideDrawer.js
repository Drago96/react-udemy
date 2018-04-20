import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer];

    if(props.open) {
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired
}

export default sideDrawer;
