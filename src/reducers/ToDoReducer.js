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
        todos: [...state.todos, action.payload].sort(
          (a, b) => a.checked - b.checked
        ),
      };
    case 'EDIT_TODO':
      //   console.log('in reducer edit check: ' + JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
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
            if (todo.id === action.payload.id) {
              return {
                ...todo,
                checked: action.payload.checked,
              };
            }
            return todo;
          })
          .sort((a, b) => a.checked - b.checked),
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
