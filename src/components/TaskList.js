import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Tasks from "./Tasks";
import "../style/Task.css";
import { RiCloseCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";

const TaskList = ({ tasks, setTasks, setCheckDoneTasks }) => {
  const [words, setWords] = useState("");
  const [date, setDate] = useState("");

  /**
   * generates pep talk of the day randomly, renders when date changes
   */
  useEffect(() => {
    const words = [
      "You can do this!",
      "Today is going to be great!",
      "You are amazing!",
      "Don't let yesterday take up too much of today",
      "The best way to get started is to quit talking and begin doing",
      "Failure will never overtake me if my determination to succeed is strong enough",
    ];
    setWords(words[Math.floor(Math.random() * words.length)]);
  }, [date]);

  /**
   * gets current date
   */
  useEffect(() => {
    let currDate = new Date();
    let date = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();

    // setDate(`${year}/${month < 10 ? `0${month}` : `${month}`}/${date}`)
    setDate(`${year}/${month < 10 ? `0${month}` : `${month}`}/${date}`);
  }, []);

  /**
   * if any changes are made to tasks array, checkDoneTasks should update and re-render
   */
  useEffect(() => {
    let completeList = tasks.filter((task) => task.isComplete === true);
    setCheckDoneTasks(completeList);
  }, [tasks]);

  /**
   * function that adds tasks to the array "tasks"
   * @param {string} task takes the task object that user inputs(from TaskForm.js),
   * input text cannot be empty or spaces or non-texts
   * @returns the updated task list by copying previous tasks and setting state
   */
  const addTask = (task) => {
    if (task.length < 0 || /^\s*$/.test(task.text) || !task.text) {
      return;
    }
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
  };

  /**
   * completeTask function updates completed tasks, adds isComplete to object and changes
   * to true, adds date to completed object
   * @param {number} _id takes the id of the task that is completed
   */
  const completeTask = (_id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === _id) {
        task.isComplete = true;
        task.date = date;
        console.log("Date type", typeof task.date);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  /**
   * removeTask function removes the deleted tasks
   * @param {*} _id take id of deleted tasks
   */
  const removeTask = (_id) => {
    const removeArr = [...tasks].filter((task) => task.id !== _id);
    setTasks(removeArr);
  };

  /**
   * updateTask function updates tasks after user edits
   * @param {number} taskId takes id of task that is edited
   * @param {string} newVadsfalue takes new user input of task (text)
   * @returns
   */
  const updateTask = (taskId, newValue) => {
    if (newValue.length < 0 || /^\s*$/.test(newValue.text) || !newValue.text) {
      return;
    }
    setTasks((prev) => prev.map((i) => (i.id === taskId ? newValue : i)));
  };

  return (
    <div className="TaskList">
      <div className="reset">
        <RiCloseCircleLine
          size={35}
          onClick={() => {
            setTasks([]);
            alert("List cleared!");
          }}
          className="clear-icon"
          data-hover="clear list"
        />
      </div>
      <h1 className="my-task"> My Tasks Today </h1>
      <div className="date">Date: {date}</div>
      <div className="words">{words}</div>
      <div className="TaskListForm">
        <TaskForm onSubmit={addTask} />
        <Tasks
          tasks={tasks}
          completeTask={completeTask}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setCheckDoneTasks: PropTypes.func.isRequired,
};
export default TaskList;
