import { createStore, applyMiddleware, compose } from 'redux';
import todoApp from './reducers/';
import thunk from 'redux-thunk';


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