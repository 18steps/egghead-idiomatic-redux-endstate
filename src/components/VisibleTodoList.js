import React, { Component } from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos, getIsFetching } from '../reducers';


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter)
      this.fetchData();
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;

    if(isFetching && !todos.length) {
      return (<p>Loading...</p>)
    }
    return (
      <TodoList
        todos={todos}
        onClickTodo={toggleTodo}
      />
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter)
  };
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList));


export default VisibleTodoList;