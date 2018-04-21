import React, { Fragment, Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        requestInterceptor = axios.interceptors.request.use(req => {
            this.setState({ error: null });
            return req;
        })

        responseInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({ error: error.message });
        })

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {
            return (
                <Fragment>
                    <Modal show={!!this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;
