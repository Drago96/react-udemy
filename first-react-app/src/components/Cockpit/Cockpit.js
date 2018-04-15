import React, { Fragment } from "react";
import Radium from "radium";

// import Aux from "../../hoc/Auxilary";
import classes from "./Cockpit.css"

const cockpit = (props) => {
    const style = {
        backgroundColor: "green",
        color: "white",
        font: "inherit",
        border: "1px solid blue",
        padding: "8px",
        cursor: "pointer",
        ":hover": {
            backgroundColor: "lightgreen",
            color: "black"
        }
    };

    if (props.showPersons) {
        style.backgroundColor = "red";
        style[":hover"].backgroundColor = "salmon";
    }

    const assignedClasses = [];

    if (props.personsLength < 2) {
        assignedClasses.push(classes.red);
    }

    if (props.personsLength < 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        // <Aux>
        <Fragment>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(" ")}>App working correctly</p>
            <button
                onClick={props.togglePersonsClicked}
                style={style}>Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </Fragment>
        // </Aux>
    );
};

export default Radium(cockpit);
