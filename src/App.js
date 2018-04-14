import React, { Component, Fragment, createContext } from 'react';
import { Provider, connect } from 'react-redux';

// import { FaStar, FaCheck, FaTimesCircle, FaRefresh } from 'react-icons/lib/fa';

import { createStore, combineReducers } from 'redux';

import './App.css';

let nextTodoId = 0;

const toggleTodo = (todo) => ({
  type: 'TOGGLE_TODO',
  payload: todo,
});

const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: nextTodoId++,
    text,
  },
});

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: filter,
});


const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...action.payload,
        completed: false,
      };
    }
    case 'TOGGLE_TODO': {
      return state.id === action.payload.id
        ? {
          ...state,
          completed: !state.completed,
        }
        : state;
    }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        todo(undefined, action),
      ];
    }
    case 'TOGGLE_TODO': {
      return state.map(t => todo(t, action));
    }
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action,
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.payload;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});


const getVisibleTodos = ({ todos, filter }) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
  }
};

// const { Provider, Consumer } = createContext();

const Todo = ({ text, completed, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={completed
        ? 'stricken'
        : ''}>{text}</li>);
};

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos({
    todos: state.todos,
    filter: state.visibilityFilter,
  }),
});


const mapDispatchToTodoListProps = (dispatch) => ({
  onClickTodo: (todo) => dispatch(toggleTodo(todo)),
});

const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onClickTodo(todo)} />
    ))}
  </ul>
);

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)(TodoList);


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


const mapDispatchToAddTodoProps = (dispatch) => ({
  onAddTodo: (text) => dispatch(addTodo(text)),
});


const AddTodo = connect(null, mapDispatchToAddTodoProps)(AddTodoPresenter);


const Link = ({ active, children, onClick }) => {
  return (
    active
      ? <span>{children}</span>
      : <a
        href="#" onClick={(e) => {
        e.preventDefault();
        onClick();
      }}>{children}</a>
  );
};

const mapStateToLinkProps = (state, ownProps) => ({
  visibilityFilter: state.visibilityFilter,
  active: ownProps.filter === visibilityFilter,
});

const mergeDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

const FilterLink = connect(
  mapStateToLinkProps,
  mergeDispatchToLinkProps,
  // mergeLinkProps,
)(Link);


const Footer = () => (
  <p>
    Show:
    {[
      {
        filter: 'SHOW_ALL',
        text: 'all',
      },
      {
        filter: 'SHOW_ACTIVE',
        text: 'active',
      },
      {
        filter: 'SHOW_COMPLETED',
        text: 'completed',
      },
    ].map(({ filter, text }, index) => (
      <Fragment key={index}>
        {' '}
        <FilterLink
          filter={filter}
        >{text}</FilterLink>
      </Fragment>
    ))}
  </p>
);



const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => (
  <Provider store={store}>
    <Fragment>
      <AddTodo />
      <VisibleTodoList />
      {/*<ConnectedAddTodo />*/}
      {/*<ConnectedVisibleTodoList />*/}
      <Footer />
    </Fragment>
  </Provider>
);

export default App;
export { store };
