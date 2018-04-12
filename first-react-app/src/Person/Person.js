import React from "react";
import "./Person.css";

import PropTypes from "prop-types";

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}> Hi, I'm {props.name} and I'm {props.age} years old </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed}
                value={props.name}/>
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

export default person;
