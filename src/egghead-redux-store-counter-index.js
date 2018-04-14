import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(<App />, document.getElementById('root'));


import { createStore } from 'redux';

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

const store = createStore(counter);

const Counter = ({
  value,
  onIncrement,
  onDecrement,
}) => (
  <div><h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => {
        store.dispatch({
          type: Actions.INCREMENT,
        });
      }}
      onDecrement={() => {
        store.dispatch({
          type: Actions.DECREMENT,
        });
      }}
    />,
    document.getElementById('root'),
  );
};

store.subscribe(render);
render();

registerServiceWorker();
