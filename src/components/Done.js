import React, { useState, useEffect } from "react";
import "../style/Done.css";
import PropTypes from "prop-types";
import { ImCheckmark } from "react-icons/im";
import { RiSaveLine } from "react-icons/ri";

function Done({ checkDoneTasks, handleSaveList }) {
  const [wordsEncourage, setWordsEncourage] = useState("");
  /**
   * generates words of encouragement, renders when checkDoneTasks(array of finished tasks) change
   */
  useEffect(() => {
    const words = [
      "You're doing great!",
      "Keep Going!",
      "You are on fire!",
      "You're on a roll!",
      "Awesome job!",
      "Great job!",
    ];
    setWordsEncourage(words[Math.floor(Math.random() * words.length)]);
  }, [checkDoneTasks]);

  return (
    <div className="Done">
      <div className="save">
        <RiSaveLine size={30} className="save-icon" onClick={handleSaveList} />
      </div>
      <div className="done-space">
        <h1>Completed Tasks</h1>
        <p id="done-words">
          {" "}
          {checkDoneTasks.length > 0 ? `${wordsEncourage}` : ""}
        </p>
        {checkDoneTasks.map((task) => (
          <div key={task.id} className="done-row">
            {task.text}
            <ImCheckmark
              className="done-icon"
              style={{ color: "white" }}
              size={28}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
Done.propTypes = {
  checkDoneTasks: PropTypes.array.isRequired,
  handleSaveList: PropTypes.func.isRequired,
};
export default Done;
