import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";

import classes from "./Person.css";

const person = (props) => {
    const style = {
        "@media (min-width: 500px)": {
            width: "450px"
        }
    };

    return (
        <div className={classes.Person} style={style}>
            <p onClick={props.click}> Hi, I&apos;m {props.name} and I&apos;m {props.age} years old </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}
                value={props.name} />
        </div>
    );
};

person.propTypes = {
    click: PropTypes.func.isRequired,
    name: PropTypes.string,
    age: PropTypes.number.isRequired,
    changed: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default Radium(person);
