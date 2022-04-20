import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../style/Task.css";

const TaskForm = ({ onSubmit, edit }) => {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  //focus on the input bar
  useEffect(() => {
    inputRef.current.focus();
  });
  /**
   * handleChange function sets the input once user enters task
   * @param {event}
   */
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * handleSubmit function updates the task list,
   * pushes new task object with random ID and text input to the "tasks" array in TaskList.js
   * @param {event}
   * resets input by setting state of input to empty string
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: Math.floor(Math.random() * 10000000),
      text: input,
    });

    setInput("");
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      {edit ? (
      
        <div>
          <input
            placeholder="Edit task"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="task-input edit"
          />
          <button
            onClick={handleSubmit}
            className="task-button edit"
            id="editBtn"
          >
            Update
          </button>
        </div>
        
      ) : (
        
        <div>
          <input
            placeholder="Add a task"
            value={input}
            onChange={handleChange}
            name="text"
            className="task-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="task-button">
            Create Task
          </button>
          </div>
        
      )}
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.any,
};
export default TaskForm;
