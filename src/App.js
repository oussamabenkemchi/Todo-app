import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useState,  useEffect } from "react";

import "./App.css";
import Todo from "./Todo";
import db from "./firebase"
import Firebase from "firebase"

import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { green } from "@material-ui/core/colors";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads, we need to listen to the db 
      //and fetch new todos as they get added/removed

  useEffect(() => {
    db.collection('todos').orderBy("timestamp","desc").onSnapshot(snapshot =>{
   // console.log(snapshot.docs.map(doc => doc.data()));
        setTodos(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo})))
    })
    
  },[])

  function handleOnChange(event) {
    const value = event.target.value;
    setInput(value);
  }

  const addTodo = (event) => {
    //console.log("nihao");
    
    db.collection("todos").add({
      todo:input,
      timestamp: Firebase.firestore.FieldValue.serverTimestamp()
    })
    
    event.preventDefault();
    setInput(""); 
  };

  const deleteTodo =(id) =>{
    db.collection("todos").doc(id).delete()
  }

  const emojiTitle = {
    marginRight: "10px",
    color: "green"
  }

  const checkboxiconStyle = {
    margin:"5px"
  }

  return (
    <div className="App">
      <h1>
      <CollectionsBookmarkIcon style ={emojiTitle} />
      Todo List </h1>
     
      <FormControl>
        <InputLabel > Write a todo</InputLabel>
        <Input onChange={handleOnChange} value={input} />
      </FormControl>

      <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add TODO
        </Button>
      <ul>
        {todos.map((todo) => {
          return (
          <Todo 
          key={todo.id}
          todo={todo}
          delete = {deleteTodo}
           />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
