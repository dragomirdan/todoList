import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../reducers/ToDoReducer';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
} from '../services/todo.service';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    gold: {
      main: 'rgba(255, 217, 0)',
    },
    danger: {
      main: 'rgba(228, 25, 25, 0.9)',
    },
  },
});

export default function ToDoList() {
  const { state, dispatch } = useContext(TodoContext);
  const [completed, setCompleted] = React.useState([0]);
  const [inputValue, setInputValue] = React.useState('');
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [editedTodoId, setEditedTodoId] = React.useState(null);
  const [editedTodoText, setEditedTodoText] = React.useState('');

  useEffect(() => {
    getTodos()
      .then((todos) => dispatch({ type: 'GET_TODOS', payload: todos }))
      .catch((error) => console.error('Error fetching todos: ', error));
  }, [dispatch]);

  const addTodo = (todo) => {
    createTodo(todo)
      .then((newTodo) => {
        dispatch({
          type: 'ADD_TODO',
          payload: { ...newTodo, id: newTodo._id },
        });
        getTodos()
          .then((todos) => dispatch({ type: 'GET_TODOS', payload: todos }))
          .catch((error) => console.error('Error fetching todos: ', error));
      })
      .catch((error) => console.error('Error creating todo: ', error));
  };

  const editTodo = (todo) => {
    updateTodo(todo)
      .then((newTodo) => {
        dispatch({ type: 'EDIT_TODO', payload: newTodo });
        getTodos()
          .then((todos) => dispatch({ type: 'GET_TODOS', payload: todos }))
          .catch((error) => console.error('Error fetching todos: ', error));
      })
      .catch((error) => console.error('Error creating todo: ', error));
  };

  const editCheckTodo = (todo) => {
    console.log(JSON.stringify(todo));
    updateTodo(todo)
      .then((newTodo) => {
        console.log('in res editCheckTodo ' + JSON.stringify(newTodo.todo));
        dispatch({ type: 'EDIT_CHECK_TODO', payload: newTodo.todo });
        getTodos()
          .then((todos) => {
            console.log(JSON.stringify(todos));
            dispatch({ type: 'GET_TODOS', payload: todos });
          })
          .catch((error) => console.error('Error fetching todos: ', error));
      })
      .catch((error) => console.error('Error creating todo: ', error));
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
      .then(() => dispatch({ type: 'DELETE_TODO', payload: id }))
      .catch((error) => console.error('Error deleting todo: ', error));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditedTodoText(event.target.value);
  };

  const handleInsertTodo = (e) => {
    addTodo({ id: Date.now(), text: inputValue, completed: false });
    setInputValue('');
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleInsertTodo();
    }
  };

  const handleDeleteAllClick = () => {
    setPopupVisible(true);
  };

  const handleConfirmDelete = () => {
    deleteTodos()
      .then(() => dispatch({ type: 'DELETE_ALL_TODOS' }))
      .catch((error) => console.error('Error deleting todo: ', error));
    setPopupVisible(false);
  };

  const handleCancelDelete = () => {
    setPopupVisible(false);
  };

  const handleDoubleClick = (todo) => {
    setEditing(true);
    setEditedTodoId(todo._id);
    setEditedTodoText(todo.text);
  };
  const handleSave = (todoEditId) => {
    editTodo({
      _id: todoEditId,
      text: editedTodoText,
    });
    setEditing(false);
    setEditedTodoId(null);
    setEditedTodoText('');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedTodoId(null);
    setEditedTodoText('');
  };

  const handleToggle = (value) => () => {
    const currentIndex = completed.indexOf(value);
    const newCompleted = [...completed];
    let valCompleted;
    console.log('current index ' + currentIndex + ' ' + value);
    console.log('current states of checked ' + newCompleted);

    if (currentIndex === -1) {
      newCompleted.push(value);
      valCompleted = true;
    } else {
      newCompleted.splice(currentIndex, 1);
      valCompleted = false;
    }
    editCheckTodo({
      _id: value,
      completed: valCompleted,
    });
    console.log('current states of checked ' + newCompleted);
    setCompleted(newCompleted);
  };

  return (
    <div>
      <div
        className="divToDo"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <List
          sx={{
            width: '100%',
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          {state.todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo._id}`;
            return (
              <ListItem
                key={todo._id}
                disablePadding
                onDoubleClick={(event) => {
                  handleDoubleClick(todo);
                }}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <ThemeProvider theme={theme}>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(todo._id)}
                        color="gold"
                      />
                    </ThemeProvider>
                  </ListItemIcon>
                  {editing && editedTodoId === todo._id ? (
                    <TextField
                      variant="standard"
                      value={editedTodoText}
                      onChange={(event) => {
                        setEditedTodoText(event.target.value);
                        handleEditChange(event);
                      }}
                    />
                  ) : (
                    <ListItemText id={labelId} primary={todo.text} />
                  )}
                </ListItemButton>
                {editing && editedTodoId === todo._id ? (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={(event) => {
                        handleSave(todo._id);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="cancel"
                      onClick={handleCancel}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <ThemeProvider theme={theme}>
                      <DeleteIcon color="danger" />
                    </ThemeProvider>
                  </IconButton>
                )}
              </ListItem>
            );
          })}
          <ListItem key="0" disablePadding>
            <ListItemButton role={undefined} type="submit" dense>
              <ListItemIcon>
                <ThemeProvider theme={theme}>
                  <Checkbox edge="start" disabled tabIndex={-1} disableRipple />
                </ThemeProvider>
              </ListItemIcon>
              <ListItemText>
                <TextField
                  id="standard-basic1"
                  label="Insert new todo"
                  variant="standard"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyUp={handleKeypress}
                />
              </ListItemText>
            </ListItemButton>
            <IconButton
              edge="end"
              aria-label="insert"
              onClick={handleInsertTodo}
            >
              <AddIcon />
            </IconButton>
          </ListItem>
        </List>
      </div>
      <div
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        {popupVisible && (
          <Modal
            open={popupVisible}
            onClose={handleCancelDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={boxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete all items?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This action cannot be reverted.
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={3}
              >
                <ThemeProvider theme={theme}>
                  <Button
                    color="danger"
                    variant="outlined"
                    onClick={handleConfirmDelete}
                  >
                    Confirm
                  </Button>
                </ThemeProvider>

                <Button variant="outlined" onClick={handleCancelDelete}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Modal>
        )}
        <ThemeProvider theme={theme}>
          <Button
            variant="outlined"
            color="danger"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAllClick}
          >
            Delete All
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}
