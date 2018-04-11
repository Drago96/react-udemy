import React from "react";
import PropTypes from "prop-types";

const userInput = (props) => {
    const style = {
        border: "2px solid red"
    };

    return (
        <input type="text"
            value={props.username}
            onChange={props.onUsernameChange}
            style={style} />
    );
};

userInput.propTypes = {
    username: PropTypes.string,
    onUsernameChange: PropTypes.func.isRequired
};

export default userInput;
