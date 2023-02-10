const todosBaseUrl = 'http://localhost:3000/todos';
const todoBaseUrl = 'http://localhost:3000/todo';

export const getTodos = () => {
  return fetch(todosBaseUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching todos: ', error);
      throw error;
    });
};

export const createTodo = (todo) => {
  //   console.log(JSON.stringify(todo));
  return fetch(todoBaseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error creating todo: ', error);
      throw error;
    });
};

export const updateTodo = (todo) => {
  return fetch(`${todoBaseUrl}/${todo._id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error updating todo: ', error);
      throw error;
    });
};

export const deleteTodo = (id) => {
  return fetch(`${todoBaseUrl}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error deleting todo: ', error);
      throw error;
    });
};

export const deleteTodos = () => {
  return fetch(`${todosBaseUrl}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error deleting todo: ', error);
      throw error;
    });
};
