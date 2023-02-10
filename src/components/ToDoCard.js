import Paper from '@mui/material/Paper';

import ToDoList from './ToDoList';
import '../assets/styles/styles.scss';

export default function ToDoCard() {
  return (
    <div className="container">
      <Paper className="mainPaperCard" elevation={3}>
        <div className="cardHeader">My todos</div>
        <ToDoList />
      </Paper>
      {/* </Box> */}
    </div>
  );
}
