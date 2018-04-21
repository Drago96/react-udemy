import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";


import './FullPost.css';

class FullPost extends Component {
    static propTypes = {
        id: PropTypes.number,
        match: PropTypes.object.isRequired
    }

    state = {
        loadedPost: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            if (!this.state.loadedPost || (this.state.loadedPost
                && this.state.loadedPost.id !== id)) {
                const { data } = await axios.get("/posts/" + id);
                this.setState({ loadedPost: data });
            }
        }
    }

    deletePostHandler = async () => {
        const response = await axios.delete("/posts/" + this.props.match.params.id);
        console.log(response);
    }

    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

        if (this.props.match.params.id) {
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
