import React from 'react';
import Todo from './Todo';


const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {Object.entries(todos).map(([ id, todo ]) => (
      <Todo
        key={id} {...todo}
        onClick={() => onClickTodo(todo)} />
    ))}
  </ul>
);


export default TodoList;