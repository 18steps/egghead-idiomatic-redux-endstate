import { schema, normalize } from 'normalizr';

const todo = new schema.Entity('todos');
const arrayOfTodos = new schema.Array(todo);

export {
  todo,
  arrayOfTodos,
};