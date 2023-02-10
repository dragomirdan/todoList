import React, { createContext, useReducer } from 'react';

const initialState = {
  todos: [],
};

const TodoContext = createContext(initialState);

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      //   console.log('in reducer get: ' + JSON.stringify(action.payload));
      return {
        ...state,
        todos: action.payload.sort((a, b) => a.completed - b.completed),
      };
    case 'ADD_TODO':
      //   console.log('in reducer add todo: ' + action.payload);
      return {
        ...state,
        todos: [...state.todos, action.payload].sort(
          (a, b) => a.completed - b.completed
        ),
      };
    case 'EDIT_TODO':
      //   console.log('in reducer edit check: ' + JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.text,
            };
          }
          return todo;
        }),
      };
    case 'EDIT_CHECK_TODO':
      //   console.log('in reducer edit check: ' + JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
          .map((todo) => {
            if (todo._id === action.payload.id) {
              return {
                ...todo,
                completed: action.payload.completed,
              };
            }
            return todo;
          })
          .sort((a, b) => a.completed - b.completed),
      };
    case 'DELETE_TODO':
      //   console.log('in reducer delete: ' + action.payload);
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
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
