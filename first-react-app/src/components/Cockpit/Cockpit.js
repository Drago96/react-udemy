import React from "react";
import Radium from "radium";

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
        <div>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(" ")}>App working correctly</p>
            <button
                onClick={props.togglePersonsClicked}
                style={style}>Toggle Persons</button>
        </div>
    );
};

export default Radium(cockpit);
