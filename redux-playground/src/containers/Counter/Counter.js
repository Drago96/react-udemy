import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        onIncrementCounter: PropTypes.func.isRequired,
        onDecrementCounter: PropTypes.func.isRequired,
        onAddCounter: PropTypes.func.isRequired,
        onSubtractCounter: PropTypes.func.isRequired,
        onStoreResult: PropTypes.func.isRequired,
        onDeleteResult: PropTypes.func.isRequired,
        results: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                    {this.props.results.map((el) => {
                        return (
                            <li key={el.id} onClick={() => this.props.onDeleteResult(el.id)}>
                                {el.value}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter.counter,
        results: state.results.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(5)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
