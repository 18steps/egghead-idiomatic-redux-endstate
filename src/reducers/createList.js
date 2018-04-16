import { combineReducers } from 'redux';

const createList = (filter) => {

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return (action.payload
          && action.payload.filter === filter)
          ? action.payload.response
            .map(todo => todo.id)
          : state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed'
          ? [ ...state, action.payload.id ]
          : state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.payload
      && action.payload.filter !== filter)
      return state;

    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.payload
      && action.payload.filter !== filter)
      return state;

    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.payload.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};


const getIds = (state) => state.ids;
const getIsFetching = (state) => state.isFetching;
const getErrorMessage = (state) => state.errorMessage;

export default createList;
export { getIds, getIsFetching, getErrorMessage };