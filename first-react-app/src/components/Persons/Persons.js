import React from "react";
import PropTypes from "prop-types";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";

const persons = (props) => (
    props.persons.map((person, index) => {
        return (
          <ErrorBoundary key={person.id}>
            <Person
              click={() => props.personClicked(index)}
              name={person.name}
              age={person.age}
              changed={(event) => props.nameChanged(event, person.id)} />
          </ErrorBoundary>
        );
      })
);

persons.propTypes = {
    persons: PropTypes.array.isRequired,
    personClicked: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired
};

export default persons;
