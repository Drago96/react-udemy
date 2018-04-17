import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            style={{
                transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.show ? "1" : "0"
            }}
            className={classes.Modal}>
            {props.children}
        </div>
    </Fragment>
);

modal.propTypes = {
    children: PropTypes.element.isRequired,
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func.isRequired
};

export default modal;
