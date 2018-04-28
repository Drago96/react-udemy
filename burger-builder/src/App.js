import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import async from "./hoc/async/async";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";


const asyncCheckout = async(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = async(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = async(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  render() {
    let routes = <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>;

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>;
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
