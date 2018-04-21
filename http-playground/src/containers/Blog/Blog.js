import React, { Component } from 'react';
import axios from "../../axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
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
                <Post
                    key={p.id}
                    title={p.title}
                    author={p.author}
                    clicked={() => this.postSelectedHandler(p.id)} />
            ));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
