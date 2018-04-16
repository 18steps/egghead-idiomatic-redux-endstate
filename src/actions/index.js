import v4 from 'uuid/v4';
import * as api from '../api';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  payload: {
    filter,
  },
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  payload: {
    filter,
    response,
  },
});

const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response =>
    dispatch(receiveTodos(filter, response)),
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
