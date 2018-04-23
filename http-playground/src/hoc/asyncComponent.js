import React, { Component } from "react";

const asyncComponent = (importComponent) => {
    return class ImportedComponent extends Component {
        state = {
            component: null
        }

        async componentDidMount() {
            const component = await importComponent();
            this.setState({component: component.default});
        }

        render() {
            const Component = this.state.component;

            return Component ? <Component {...this.props} /> : null;
        }
    };
};

export default asyncComponent;
