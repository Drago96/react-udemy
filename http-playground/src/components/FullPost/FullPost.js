import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {
    static propTypes = {
        id: PropTypes.number
    }

    state = {
        loadedPost: null
    }

    async componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost
                && this.state.loadedPost.id !== this.props.id)) {
                const { data } = await axios.get("/posts/" + this.props.id);
                this.setState({ loadedPost: data });
            }
        }
    }

    deletePostHandler = async () => {
        const response = await axios.delete("/posts/" + this.props.id);
        console.log(response);
    }

    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;
