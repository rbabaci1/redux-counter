import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import './styles.scss';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// action creators
const incrementValue = () => ({
  type: INCREMENT,
});
const decrementValue = () => ({
  type: DECREMENT,
});
const resetValue = () => ({
  type: RESET,
});

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
};

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, incrementValue, decrementValue, resetValue } = this.props;

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={incrementValue}>Increment</button>
          <button onClick={decrementValue}>Decrement</button>
          <button onClick={resetValue}>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  // return {
  //   increment() {
  //     dispatch(incrementValue());
  //   },
  //   decrement() {
  //     dispatch(decrementValue());
  //   },
  //   reset() {
  //     dispatch(resetValue());
  //   },
  // };
  return bindActionCreators(
    {
      incrementValue,
      decrementValue,
      resetValue,
    },
    dispatch,
  );
};

// const mapDispatchToProps = {
//   increment: incrementValue,
//   decrement: decrementValue,
//   reset: resetValue,
// };

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
