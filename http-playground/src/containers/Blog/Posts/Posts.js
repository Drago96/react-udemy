import React, { Component } from "react";
import { Link } from "react-router-dom";

import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import "./Posts.css";

class Posts extends Component {
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
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(p => (
                <Link
                    to={"/posts/" + p.id}
                    key={p.id}>
                    <Post
                        title={p.title}
                        author={p.author}
                        clicked={() => this.postSelectedHandler(p.id)} />
                </Link>
            ));
        }

        return <section className="Posts">
            {posts}
        </section>;
    }
}

export default Posts;
