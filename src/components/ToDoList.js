import React, { useContext } from 'react';
import { TodoContext } from '../reducers/ToDoReducer';

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
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

export default function ToDoList() {
  const { state, dispatch } = useContext(TodoContext);
  const [checked, setChecked] = React.useState([0]);
  const [inputValue, setInputValue] = React.useState('');
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [originalText, setOriginalText] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
    const listItems = document.querySelectorAll('.todo-item');
    listItems.forEach((item) => {
      item.addEventListener('dblclick', handleDoubleClick);
    });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Submit inputValue here
    // this.addTodo({ id: Date.now(), text: inputValue });
    // console.log(inputValue);
  };

  const handleInsertTodo = (e) => {
    handleSubmit();
    // need to change math random into the id from the db
    addTodo({ id: Math.random(), text: inputValue });
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

  const handleConfirmDelete = (id) => {
    dispatch({ type: 'DELETE_ALL_TODOS', payload: id });
    setPopupVisible(false);
  };

  const handleCancelDelete = () => {
    setPopupVisible(false);
  };

  const handleDoubleClick = (todo) => {
    setEditing(true);
    setOriginalText(todo.text);
  };

  const handleSave = (event) => {
    setEditing(false);
    setOriginalText('');
    // add code here to update the todo text in the list
  };

  const handleCancel = () => {
    setEditing(false);
    setOriginalText('');
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
            // maxWidth: 300,
            // bgcolor: 'background.paper',
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          {
            // state.todos.forEach(item => {
            //todo.addEventListener('dblclick', handleDoubleClick);
            //   });
            // state.todos.map();
            state.todos.map((todo) => {
              const labelId = `checkbox-list-label-${todo.id}`;

              return (
                <ListItem
                  key={todo.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    // onClick={handleToggle(todo.id)}
                    onDoubleClick={handleDoubleClick}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(todo.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(todo.id)}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={todo.text} />
                  </ListItemButton>
                </ListItem>
              );
            })
          }
          <ListItem
            key="0"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="insert"
                onClick={handleInsertTodo}
              >
                <AddIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              type="submit"
              // onClick={handleToggle(todo.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  disabled
                  tabIndex={-1}
                  disableRipple
                  // inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText>
                <TextField
                  id="standard-basic1"
                  label="Insert new To Do"
                  variant="standard"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyUp={handleKeypress}
                />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      {/* <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => addTodo({ id: Date.now(), text: 'New Todo' })}
        >
          Add ToDo
        </Button> */}
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
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </Button>
                <Button variant="contained" onClick={handleCancelDelete}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Modal>
        )}
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAllClick}
        >
          Delete All
        </Button>
      </div>
    </div>
  );
}
