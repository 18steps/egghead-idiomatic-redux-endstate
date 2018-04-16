import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import todoApp from './reducers/';


const configureStore = () => {
  const middlewares = [ promise ];

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