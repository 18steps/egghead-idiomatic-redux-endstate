import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';


const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});


const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[ filter ]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[ filter ]);

const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[ filter ]);

export default todos;
export { getVisibleTodos, getIsFetching, getErrorMessage };