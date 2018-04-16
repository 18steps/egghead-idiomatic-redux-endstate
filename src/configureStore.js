import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/';

const logging = (store) => {
  return (next) => {
    if (!console.group)
      return next;
    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      const returnValue = next(action);
      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd();
      return returnValue;
    };
  };
};

const promise = (store) => (next) => (action) =>
  typeof action.then === 'function'
    ? action.then(next)
    : next(action);

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};

const configureStore = () => {
  const store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logging);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configureStore;