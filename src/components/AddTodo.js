import { addTodo } from '../actions';
import { connect } from 'react-redux';
import AddTodoPresenter from './AddTodoPresenter';


const AddTodo = connect(
  null,
  {
    onAddTodo: addTodo,
  },
)(AddTodoPresenter);

export default AddTodo;