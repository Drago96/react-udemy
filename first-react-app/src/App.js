import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Drago", age: 21 },
      { name: "Max", age: 28 }
    ]
  };

  changeName = (newName) => {
    const newState = { ...this.state };
    newState.persons[0].name = newName;
    this.setState(newState);
  }

  switchNameHandler = (newName) => {
    this.changeName(newName);
  }

  nameChangedHandler = (event) => {
    const name = event.target.value;

    this.changeName(name);
  }

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button
          onClick={() => this.switchNameHandler("Switched!")}
          style={style}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, "Dragomir")}
          changed={this.nameChangedHandler}>
          My hobby is knitting</Person>
        {/* <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
         /> */}
      </div>
    );
    // return React.createElement("div", { className: "App" },
    //   React.createElement("h1", null, "Hello React"),
    //   React.createElement("h1", null, "Bye React"),
    //   React.createElement("h1", null, "Hi again React")
    // );
  }
}

export default App;
