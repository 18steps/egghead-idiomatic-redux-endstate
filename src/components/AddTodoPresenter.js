import React from 'react';

const AddTodoPresenter = ({ onAddTodo }) => {
  let input;
  const addTodo = (e) => {
    e.preventDefault();
    onAddTodo(input.value);
    input.value = '';
  };
  return (
    <form onSubmit={addTodo}>
      <input type="text" ref={node => input = node} />
      <button
        onClick={addTodo}>Add todo
      </button>
    </form>
  );
};

export default AddTodoPresenter;