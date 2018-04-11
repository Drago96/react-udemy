import React, { Component } from 'react';
import './App.css';
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";

class App extends Component {
  state = {
    username: "Drago"
  }

  usernameChangeHandler = (event) => {
    const username = event.target.value;
    this.setState({
      username
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput username={this.state.username}
          onUsernameChange={this.usernameChangeHandler}/>
        <UserOutput username={this.state.username}/>
      </div>
    );
  }
}

export default App;
