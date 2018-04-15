import uuidv4 from 'uuid/v4';

const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: uuidv4(),
    text,
  },
});
const toggleTodo = (todo) => ({
  type: 'TOGGLE_TODO',
  payload: todo,
});

export { addTodo, toggleTodo };