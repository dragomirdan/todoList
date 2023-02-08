import React, { createContext, useReducer } from 'react';

const initialState = {
  todos: [],
};

const TodoContext = createContext(initialState);

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'DELETE_ALL_TODOS':
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
