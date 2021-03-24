import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import "./Todo.css";

import db from "./firebase";

import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () =>{
      db.collection("todos").doc(props.todo.id).set({
        todo: input
      },{ merge:true })
      setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <div className={classes.paper}>
          <h1>Open</h1>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder = {props.todo.todo}
          />
          <Button onClick={updateTodo}>Update Todo </Button>
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem className="todo__item">
          <ListItemText primary={props.todo.todo} secondary="Dead line" />
        </ListItem>
        <Button onClick={handleOpen}>Edit</Button>
        <Button
          onClick={() => {
            props.delete(props.todo.id);
          }}
        >
          <DeleteIcon />
        </Button>
      </List>
    </>
  );
}

export default Todo;
