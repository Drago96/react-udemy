import React, { Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./Layout.css"

const layout = (props) => (
    <Fragment>
        <div>Header</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
);

layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default layout;
