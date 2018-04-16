import v4 from 'uuid/v4';
import * as api from '../api';


const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  payload: {
    filter,
    response,
  },
});

const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response),
  );

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

export { fetchTodos, addTodo, toggleTodo };