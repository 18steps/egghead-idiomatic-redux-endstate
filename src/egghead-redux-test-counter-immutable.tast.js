import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
import deepFreeze from 'deep-freeze';

const addCounter = (list) => {
  return [ ...list, 0 ];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [ 0 ];
  deepFreeze(listBefore);

  expect(
    addCounter(listBefore),
  ).toEqual(listAfter);
};

it('adds a counter', () => {
  testAddCounter();
});

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1),
  ];
};

const testRemoveCounter = () => {
  const listBefore = [ 0, 1, 2 ];
  const listAfter = [ 0, 2 ];
  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1),
  ).toEqual(listAfter);
};

it('removes a counter', () => {
  testRemoveCounter();
});

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[ index ] + 1,
    ...list.slice(index + 1),
  ];
};


const testIncrementCounter = () => {
  const listBefore = [ 0, 10, 20 ];
  const listAfter = [ 0, 11, 20 ];
  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1),
  ).toEqual(listAfter);
};

it('increments a counter', () => {
  testIncrementCounter();
});