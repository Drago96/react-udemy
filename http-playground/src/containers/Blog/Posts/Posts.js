import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import axios from "../../../axios";
import "./Posts.css";

class Posts extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    }

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get("/posts");

            const posts = data.slice(0, 4);
            posts.forEach(p => {
                p.author = "Drago";
            });
            this.setState({ posts });
        } catch (e) {
            this.setState({ error: true });
        }
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: "/posts/" + id });
    }

    render() {
        let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(p => (
                // <Link
                //    to={"/posts/" + p.id}
                //    key={p.id}>
                <Post
                    key={p.id}
                    title={p.title}
                    author={p.author}
                    clicked={() => this.postSelectedHandler(p.id)} />
                // </Link >
            ));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>);
    }
}

export default Posts;
