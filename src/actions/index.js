import v4 from 'uuid/v4';
import * as api from '../api';
import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import * as schema from './schema';


const fetchTodos = (filter) =>
  (dispatch, getState) => {
    if (getIsFetching(getState(), filter))
      return Promise.resolve();

    dispatch({
      type: 'FETCH_TODOS_REQUEST',
      filter,
    });

    return api.fetchTodos(filter).then(
      response =>
        dispatch({
          type: 'FETCH_TODOS_SUCCESS',
          filter,
          response: normalize(response, schema.arrayOfTodos),
        }),
      error =>
        dispatch({
          type: 'FETCH_TODOS_FAILURE',
          filter,
          message: error.message || 'Something went wrong.',
        }),
    );
  };

const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(
    response =>
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        response: normalize(response, schema.todo),
      }),
    error => dispatch({
      type: 'ADD_TODO_FAILURE',
      message: error.message || 'Something went wrong.',
    }),
  );

const toggleTodo = (id) => (dispatch) => ({
  type: 'TOGGLE_TODO',
  id,
});

export {
  fetchTodos,
  addTodo,
  toggleTodo,
};
