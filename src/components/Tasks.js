import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { ImCheckmark2 } from "react-icons/im";
import { TiEdit } from "react-icons/ti";
import TaskForm from "./TaskForm";
import PropTypes from "prop-types";
import "../style/Task.css";

const Tasks = ({ tasks, completeTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState({ id: null, value: "", status: false });

  /**
   * submitUpdate function updates the tasks that users edited
   * @param {string} takes value value of user input
   */
  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({ ...edit, id: null, value: "" });
  };
  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return tasks.map((task, idx) => (
    <div
      className={task.isComplete ? "task-row complete" : "task-row"}
      key={idx}
    >
      <div
        key={task.id}
        onClick={() => {
          completeTask(task.id);
        }}
      >
        {task.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ ...edit, id: task.id, value: task.text })}
          className="edit-icon"
        />
        <ImCheckmark2
          onClick={() => {
            task.isComplete ? (task.isComplete = false) : completeTask(task.id);
          }}
          className="done-icon"
        />
      </div>
    </div>
  ));
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  completeTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Tasks;
