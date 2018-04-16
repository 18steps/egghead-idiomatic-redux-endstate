import { combineReducers } from 'redux';

const createList = (filter) => {

  const ids = (state = [], action) => {
    if (action.payload
      && action.payload.filter !== filter)
      return state;

    switch (action.type) {
      case 'RECEIVE_TODOS': {
        return action.payload.response
          .map(todo => todo.id);
      }
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.payload
      && action.payload.filter !== filter)
      return state;

    switch (action.type) {
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
  });
};


const getIds = (state) => state.ids;
const getIsFetching = (state) => state.isFetching;

export default createList;
export { getIds, getIsFetching };