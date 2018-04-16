const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS': {
      return action.payload.response
        .reduce((memo, todo) => ({
          ...memo,
          [ todo.id ]: todo,
        }), { ...state });
    }
    default:
      return state;
  }
};

const getTodo = (state, id) => state[ id ];

export default byId;
export { getTodo };