import React, { Component, Fragment } from 'react';
// import { FaStar, FaCheck, FaTimesCircle, FaRefresh } from 'react-icons/lib/fa';

import { createStore } from 'redux';

import './App.css';

const Actions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      return state + 1;
    case Actions.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

// const createStore = (reducer) => {
//
//   let state;
//   let listeners = [];
//
//   const getState = () => state;
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//   };
//
//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter(l => l !== listener);
//     }
//   };
//
//   dispatch({});
//
//   return {
//     getState,
//     dispatch,
//     subscribe,
//   };
// };

const store = createStore(counter);


class App extends Component {
  render() {
    return (
      <Fragment>
        <div>yolo</div>
      </Fragment>
    );
  }
}

export default App;
export {
  counter, Actions,
};
