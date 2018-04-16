import v4 from 'uuid/v4';
import * as api from '../api';
import { getIsFetching } from '../reducers';


const fetchTodos = (filter) =>
  (dispatch, getState) => {
    if (getIsFetching(getState(), filter))
      return Promise.resolve();

    dispatch({
      type: 'FETCH_TODOS_REQUEST',
      payload: {
        filter,
      },
    });

    return api.fetchTodos(filter).then(
      response =>
        dispatch({
          type: 'FETCH_TODOS_SUCCESS',
          payload: {
            filter,
            response,
          },
        }),
      error =>
        dispatch({
          type: 'FETCH_TODOS_FAILURE',
          payload: {
            filter,
            message: error.message || 'Something went wrong.',
          },
        }),
    );
  };

const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: v4(),
    text,
  },
});

const toggleTodo = (todo) => ({
  type: 'TOGGLE_TODO',
  payload: todo,
});

export {
  fetchTodos,
  addTodo,
  toggleTodo,
};
