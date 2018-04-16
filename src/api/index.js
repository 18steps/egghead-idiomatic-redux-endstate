import v4 from 'uuid/v4';

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: 'hey',
      completed: true,
    }, {
      id: v4(),
      text: `been tryin' to meet ya`,
      completed: true,
    },
    {
      id: v4(),
      text: 'hey',
      completed: false,
    }, {
      id: v4(),
      text: 'must be a devil between us',
      completed: false,
    },
  ],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const fetchTodos = (filter) =>
  delay(500).then(() => {
    if (Math.random() > 0.5)
      throw new Error('Boom!');

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

const addTodo = (text) =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

const toggleTodo = (id) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });

export { fetchTodos, addTodo, toggleTodo };