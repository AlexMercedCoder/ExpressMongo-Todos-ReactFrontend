import React from "react";

const Display = (props) => {
  if (props.todos) {
    return (
      <ul>
        {props.todos.map((todo) => (
          <li key={todo._id}>
            {todo.reminder} - {todo.completed ? "Done" : "incomplete"} -{" "}
            <button
              onClick={(event) => {
                props.editThisTodo(todo);
                props.history.push("/edit");
              }}
            >
              Edit
            </button>
            <button onClick={() => props.deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <h1>Still Loading or No Todos</h1>;
  }
};

export default Display;
