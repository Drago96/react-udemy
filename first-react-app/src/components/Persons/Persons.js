import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[Persons.js] Inside constructor", props);
  }

  componentWillMount() {
    console.log("[Persons.js] Inside componentWillMount");
  }

  componentDidMount() {
    console.log("[Persons.js] Inside componentDidMount");
  }

  componentWillUnmount() {
    console.log("[Persons.js] Inside componentWillUnmount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("[UPDATE Persons.js] Inside componentWillReceiveProps", nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[UPDATE Persons.js] Inside shouldComponentUpdate", nextProps, nextState);

  //   return nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.click !== this.props.click;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log("[UPDATE Persons.js] Inside componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate() {
    console.log("[UPDATE Persons.js] Inside componentDidUpdate");
  }

  render() {
    console.log("[Persons.js] Inside render");

    return this.props.persons.map((person, index) => {
      return (
        <ErrorBoundary key={person.id}>
          <Person
            click={() => this.props.personClicked(index)}
            name={person.name}
            age={person.age}
            changed={(event) => this.props.nameChanged(event, person.id)} />
        </ErrorBoundary>
      );
    })
  }
}

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
  personClicked: PropTypes.func.isRequired,
  nameChanged: PropTypes.func.isRequired
};

export default Persons;
