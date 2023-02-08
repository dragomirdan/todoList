import Paper from '@mui/material/Paper';

import ToDoList from './ToDoList';
import '../assets/styles/styles.scss';

export default function ToDoCard() {
  return (
    <div className="container">
      {/* <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: '33px',
        }}
      > */}
      <Paper
        sx={{
          borderRadius: '33px',
          height: '100%',
          width: '30%',
        }}
        elevation={3}
      >
        <div>
          <h1>To Do List</h1>
        </div>
        <ToDoList />
      </Paper>
      {/* </Box> */}
    </div>
  );
}
