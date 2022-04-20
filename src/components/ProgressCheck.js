import React from "react";
import "../style/Progress.css";
import PropTypes from "prop-types";

function ProgressCheck({ percent, checkDoneTasks }) {
  return (
    <div className="ProgressCheck">
      <h1>Progress</h1>
      <h4> You have Completed: {checkDoneTasks.length} Task(s)</h4>
      <h2 className="percentage">{percent >= 0 ? `${percent} % Done!` : ""}</h2>
    </div>
  );
}

ProgressCheck.propTypes = {
  percent: PropTypes.number.isRequired,
  checkDoneTasks: PropTypes.array.isRequired,
};
export default ProgressCheck;
