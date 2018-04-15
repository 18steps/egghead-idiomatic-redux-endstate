import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);

export default todoApp;
export { getVisibleTodos };