import React, { Component, Fragment, createContext } from 'react';
// import { FaStar, FaCheck, FaTimesCircle, FaRefresh } from 'react-icons/lib/fa';

import { createStore, combineReducers } from 'redux';

import './App.css';


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

const { Provider, Consumer } = createContext();

const Todo = ({ text, completed, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={completed
        ? 'stricken'
        : ''}>{text}</li>);
};

const withStore = (Component) => (props) => (
  <Consumer>
    {store => <Component store={store} {...props} />}
  </Consumer>
);


class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { todos, visibilityFilter: filter } = this.props.store.getState();

    return (

      <TodoList
        todos={getVisibleTodos({
          todos,
          filter,
        })}
        onClickTodo={(todo) => {
          this.props.store.dispatch({
            type: 'TOGGLE_TODO',
            payload: todo,
          });
        }} />
    );
  }
}

const ConnectedVisibleTodoList = withStore(VisibleTodoList);

const TodoList = ({ todos, onClickTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onClickTodo(todo)} />
    ))}
  </ul>
);


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

class AddTodo extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <AddTodoPresenter
        onAddTodo={(text) =>
          this.props.store.dispatch({
            type: 'ADD_TODO',
            payload: {
              id: nextTodoId++,
              text,
            },
          })}
      />
    );
  }
}
const ConnectedAddTodo = withStore(AddTodo);

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children, store } = this.props;
    const { visibilityFilter } = store.getState();

    return (
      <Link
        active={filter === visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: filter,
          })}
      >{children}</Link>
    );
  }
}


const ConnectedFilterLink = withStore(FilterLink);


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
        <ConnectedFilterLink
          filter={filter}
        >{text}</ConnectedFilterLink>
      </Fragment>
    ))}
  </p>
);

let nextTodoId = 0;

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => (
  <Provider value={store}>
    <ConnectedAddTodo />
    <ConnectedVisibleTodoList />
    <Footer />
  </Provider>
);

export default App;
export { store };
