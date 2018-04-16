import React, { Component } from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';


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

  // console.group('fetchTodos');
  // console.log('filter: ', filter);
  // console.log('todos: ', todos);
  // console.groupEnd();

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        onClickTodo={toggleTodo}
        {...rest}
      />
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || 'all';
  return {
    filter,
    todos: getVisibleTodos(state, filter),
  };
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList));


export default VisibleTodoList;