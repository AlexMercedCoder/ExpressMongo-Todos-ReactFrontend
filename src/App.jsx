import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Display from "./pages/Display";
import Form from "./pages/Form";

function App(props) {
  //API BASE URL
  const url = "http://localhost:10000/todos";

  //make state to hold our api data
  const [todos, setTodos] = useState(null);

  //state to hold edit target
  const [todoToEdit, setTodoToEdit] = useState({})

  //function to retrieve data
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTodos(data);
  };

  // Function to Create Todos
  const createTodo = async (newTodo) => {
    //make new todo
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newTodo)

    })
    // update list of todos
    getTodos()
  }

    // Function to Create Todos
  const updateTodo = async (updatedTodo) => {
      //make new todo
      await fetch(url + `/${updatedTodo._id}`, {
        method: "put",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedTodo)
  
      })
      // update list of todos
      getTodos()
    }

  const deleteTodo = async (deletedTodo) => {
      //make new todo
      await fetch(url + `/${deletedTodo._id}`, {
        method: "delete"
        })
      // update list of todos
      getTodos()
    }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h1>Alex's Todo App!</h1>
      <Link to="/new"><button>Create a Todo</button></Link>
      <Switch>
        <Route exact path="/">
          <Display todos={todos} editThisTodo={setTodoToEdit} history={props.history} deleteTodo={deleteTodo}/>
        </Route>
        <Route exact path="/new">
          <Form submitFunc={createTodo} history={props.history} label="create"/>
        </Route>
        <Route exact path="/edit">
          <Form submitFunc={updateTodo} history={props.history} label="update" initialState={todoToEdit}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
