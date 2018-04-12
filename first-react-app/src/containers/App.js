import React, { PureComponent } from 'react';
import Radium, { StyleRoot } from "radium";

import classes from './App.css';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[App.js] Inside constructor", props);
    this.state = {
      persons: [
        { id: 1, name: "Drago", age: 21 },
        { id: 2, name: "Max", age: 28 }
      ],
      showPersons: false,
      toggleClicked: 0
    };
  }

  // state = {
  //   persons: [
  //     { id: 1, name: "Drago", age: 21 },
  //     { id: 2, name: "Max", age: 28 }
  //   ],
  //   showPersons: false
  // }

  componentWillMount() {
    console.log("[App.js] Inside componentWillMount");
  }

  componentDidMount() {
    console.log("[App.js] Inside componentDidMount");
  }

  componentWillUnmount() {
    console.log("[App.js] Inside componentWillUnmount");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[UPDATE App.js] Inside shouldComponentUpdate", nextProps, nextState);

  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log("[UPDATE App.js] Inside componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate() {
    console.log("[UPDATE App.js] Inside componentDidUpdate");
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
    // const showPersons = !this.state.showPersons;
    // const toggleClicked = this.state.toggleClicked + 1;

    this.setState((prevState, props) => {
      return {
        showPersons: !prevState.showPersons,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  }

  render() {
    console.log("[App.js] Inside render");

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        personClicked={this.deletePersonHandler}
        nameChanged={this.nameChangedHandler} />
    }

    return (
      <StyleRoot>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          togglePersonsClicked={this.togglePersonsHandler} />
        {persons}
      </StyleRoot>
    );

    // return React.createElement("div", {className: "App" },
    //   React.createElement("h1", null, "Hello React"),
    //   React.createElement("h1", null, "Bye React"),
    //   React.createElement("h1", null, "Hi again React")
    // );
  }
}

export default withClass(Radium(App), classes.App);
