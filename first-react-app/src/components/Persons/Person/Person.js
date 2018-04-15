import React, { Component } from "react";
import Radium from "radium";
import PropTypes from "prop-types";

import classes from "./Person.css";

import { AuthContext } from "../../../containers/App";

class Person extends Component {
    constructor(props) {
        super(props);
        console.log("[Person.js] Inside constructor", props);

        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log("[Person.js] Inside componentWillMount");
    }

    componentDidMount() {
        console.log("[Person.js] Inside componentDidMount");
        if (this.props.position === 0) {
            this.inputElement.current.focus();
        }
    }

    componentWillUnmount() {
        console.log("[Person.js] Inside componentWillUnmount");
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log("[Person.js] Inside render");

        const style = {
            "@media (min-width: 500px)": {
                width: "450px"
            }
        };

        return (
            <div className={classes.Person} style={style} >
                <AuthContext.Consumer>
                    {auth => auth ? <p>I&apos;m authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}> Hi, I&apos;m {this.props.name} and I&apos;m {this.props.age} years old </p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </div>
        );
    }
};

Person.propTypes = {
    click: PropTypes.func.isRequired,
    name: PropTypes.string,
    age: PropTypes.number.isRequired,
    changed: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default Radium(Person);
