import React from 'react';
import Todo from './Todo';


const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id} {...todo}
        onClick={() => onClickTodo(todo.id)} />
    ))}
  </ul>
);


export default TodoList;