import { combineReducers } from 'redux';
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO': {
      return {
        ...state,
        [ action.payload.id ]: todo(state[ action.payload.id ], action),
      };
    }
    case 'RECEIVE_TODOS': {
      return {
        ...state,

      }
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [ ...state, action.payload.id ];
    }
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds,
});

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[ id ]);


const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      return allTodos;
    case 'active':
      return allTodos.filter(t => !t.completed);
    case 'completed':
      return allTodos.filter(t => t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

export default todos;
export { getVisibleTodos };