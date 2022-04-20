import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import Done from "../components/Done";
import ProgressCheck from "../components/ProgressCheck";
import PropTypes from "prop-types";

const MainPage = ({ tdm }) => {
  const [tasks, setTasks] = useState([]);
  const [checkDoneTasks, setCheckDoneTasks] = useState([]);
  const [percent, setPercent] = useState(0);

  /**
   * calculates percentage for progress component
   */
  useEffect(() => {
    const percentage = (checkDoneTasks.length / tasks.length) * 100;
    setPercent(percentage.toFixed(2));
  }, [tasks, checkDoneTasks]);

  /**
   * handleSaveList function adds completed tasks to the database and resets checkDoneTasks array
   * When users save completed tasks, the completed component needs to reset
   * tasks array also need to remove the ones that are completed and archived
   */
  const handleSaveList = () => {
    const newTaskList = tasks.filter((task) => task.isComplete !== true);
    setTasks(newTaskList);
    checkDoneTasks.forEach((task) => tdm.saveDoneList(task));
    setCheckDoneTasks([]);
    alert("Tasks Saved!");
  };

  return (
    <div className="main-page">
      <div className="col-sm">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setCheckDoneTasks={setCheckDoneTasks}
        />
      </div>
      <div className="col-sm">
        <Done checkDoneTasks={checkDoneTasks} handleSaveList={handleSaveList} />
      </div>
      <div className="col-sm" id="progress-c">
        <ProgressCheck percent={percent} checkDoneTasks={checkDoneTasks} />
      </div>
    </div>
  );
};
MainPage.propTypes = {
  tdm: PropTypes.object.isRequired,
};
export default MainPage;
