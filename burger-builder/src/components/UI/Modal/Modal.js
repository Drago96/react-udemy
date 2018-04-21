import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    static propTypes = {
        children: PropTypes.node,
        show: PropTypes.bool.isRequired,
        modalClosed: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
            || nextProps.children !== this.props.children;
    }

    render() {
        return <Fragment>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                style={{
                    transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: this.props.show ? "1" : "0"
                }}
                className={classes.Modal}>
                {this.props.children}
            </div>
        </Fragment>;
    }
}

export default Modal;
