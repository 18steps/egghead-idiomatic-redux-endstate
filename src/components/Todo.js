import React from 'react';


const Todo = ({ text, completed, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={completed
        ? 'stricken'
        : ''}>{text}</li>);
};

export default Todo;