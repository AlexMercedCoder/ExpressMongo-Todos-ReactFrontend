import React from "react";
import { useState } from "react";

const Form = (props) => {
  const {
    initialState = { reminder: "", completed: false },
    submitFunc = () => {},
    label = "submit",
    history
  } = props;

  // The Form State
  const [formState, setFormState] = useState(initialState);

  // The Handle Change Function
  const handleChange = (event) => {
    const newState = {...formState}
      if(event.target.type === "checkbox"){
        newState[event.target.name] = event.target.checked
      } else {
        newState[event.target.name] = event.target.value
      }
      setFormState(newState)
  }

  // The Handle Submit Function
  const handleSubmit = (event) => {
      event.preventDefault()
      submitFunc(formState)
      history.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="reminder" value={formState.reminder} onChange={handleChange} />
      <input type="checkbox" name="completed" checked={formState.completed} onChange={handleChange}/>
      <input type="submit" value={label} />
    </form>
  );
};

export default Form;
