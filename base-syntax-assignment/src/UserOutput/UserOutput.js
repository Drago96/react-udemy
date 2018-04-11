import React from "react";
import PropTypes from "prop-types";

import "./UserOutput.css";

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            {props.username}
        </div>
    );
};

userOutput.propTypes = {
    username: PropTypes.string.isRequired
};

export default userOutput;
