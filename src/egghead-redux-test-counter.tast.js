import React from 'react';
import ReactDOM from 'react-dom';
import App, { counter, Actions } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('increments 0 to 1', () => {
  expect(
    counter(0, { type: Actions.INCREMENT }),
  ).toEqual(1);
});

it('increments 1 to 2', () => {
  expect(
    counter(1, { type: Actions.INCREMENT }),
  ).toEqual(2);
});

it('decrements 2 to 1', () => {
  expect(
    counter(2, { type: Actions.DECREMENT }),
  ).toEqual(1);
});

it('decrements 1 to 0', () => {
  expect(
    counter(1, { type: Actions.DECREMENT }),
  ).toEqual(0);
});

it('keeps state when type is not recognized', () => {
  expect(
    counter(1, { type: 'SOME_OTHER_ACTION' }),
  ).toEqual(1);
});

it('sets initial state when state is undefined', () => {
  expect(
    counter(undefined, {}),
  ).toEqual(0);
});

