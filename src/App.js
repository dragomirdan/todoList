import React from 'react';

import { TodoProvider } from './reducers/ToDoReducer';
import ToDoCard from './components/ToDoCard';
import '../src/assets/styles/styles.scss';

function App() {
  return (
    <TodoProvider>
      <ToDoCard />
    </TodoProvider>
  );
}

export default App;
