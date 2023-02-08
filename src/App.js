import React from 'react';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import { TodoProvider } from './reducers/ToDoReducer';
import ToDoCard from './components/ToDoCard';
import '../src/assets/styles/styles.scss';

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/todos')
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
  return (
    <TodoProvider>
      <ToDoCard />
    </TodoProvider>
  );
}

export default App;
