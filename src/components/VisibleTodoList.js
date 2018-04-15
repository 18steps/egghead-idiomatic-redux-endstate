import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers/';


const mapStateToProps = (state, { match: { params: { filter } } }) => ({
  todos: getVisibleTodos(state, filter || 'all'),
});


const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  {
    onClickTodo: toggleTodo,
  },
)(TodoList));

export default VisibleTodoList;