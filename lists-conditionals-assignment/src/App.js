import React, { Component } from 'react';
import './App.css';
import Validation from "./Validation/Validation";
import Char from "./Char/Char";

class App extends Component {
  state = {
    text: "",
    length: 0
  }

  charClickedHandler = (index) => {
    const text = this.state.text.split("");
    text.splice(index, 1);
    const newText = text.join("");

    this.setState({
      text: newText,
      length: newText.length
    });
  }

  textChangedHandler = (event) => {
    const newText = event.target.value;

    this.setState({
      text: newText,
      length: newText.length
    });
  };

  render() {
    const charList = this.state.text.split("").map((c, index) => {
      return (
        <Char
          key={index}
          char={c}
          onClick={() => this.charClickedHandler(index)} />
      );
    });

    return (
      <div className="App">
        <input type="text"
          value={this.state.text}
          onChange={this.textChangedHandler} />
        <Validation length={this.state.length} />
        {charList}
      </div>
    );
  }
}

export default App;
