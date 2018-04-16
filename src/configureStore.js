import { createStore, applyMiddleware, compose } from 'redux';
import todoApp from './reducers/';

const thunk = (store) => (next) => (action) =>
  typeof action === 'function'
    ? action(store.dispatch)
    : next(action);

const configureStore = () => {
  const middlewares = [ thunk ];

  return createStore(
    todoApp,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
    ),
  );
};

export default configureStore;