import React from "react";
import PropTypes from "prop-types";

const char = (props) => {
    const style = {
        display: "inline-block",
        textAlign: "center",
        margin: "16px",
        padding: "16px",
        border: "1px solid black",
        cursor: "pointer"
    };

    return (
        <div
            style={style}
            onClick={props.onClick}>{props.char}</div>
    );
};

char.propTypes = {
    char: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default char;
