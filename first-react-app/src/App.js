import React, { Component } from 'react';
import './App.css';
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Drago", age: 21 },
      { id: 2, name: "Max", age: 28 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    const person = {
      ...this.state.persons[personIndex]
    };

    const newName = event.target.value;
    person.name = newName;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  }

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person key={person.id}
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I&apos;m a React App</h1>
        <button
          onClick={this.togglePersonsHandler}
          style={style}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement("div", {className: "App" },
    //   React.createElement("h1", null, "Hello React"),
    //   React.createElement("h1", null, "Bye React"),
    //   React.createElement("h1", null, "Hi again React")
    // );
  }
}

export default App;
