import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import asyncComponent from "../../hoc/asyncComponent";
import './Blog.css';

const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: "orange",
                                        fontWeight: "bold"
                                    }}>
                                    Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: "/new-post",
                                    hash: "#submit",
                                    search: "?quick-submit=true"
                                }} exact>
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Redirect exact from="/" to="/posts" />
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div >
        );
    }
}

export default Blog;
