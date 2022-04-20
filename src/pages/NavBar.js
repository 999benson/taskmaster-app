import React, { useState } from "react";
import "../style/Navbar.css";
import MainPage from "./MainPage";
import TaskDoneManager from "../components/TaskDoneManager";
import Tracker from "./Tracker";

function NavBar() {
  //create instance of TaskDoneManager tdm object(db) and use it as prop for MainPage component
  const tdm = new TaskDoneManager();
  const [clickTrack, setClickTrack] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-custom fixed-top navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-body rounded">
        <div className="container-fluid">
          <a className="navbar-brand">TaskMaster</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <p
                  className="nav-link"
                  onClick={() => {
                    setClickTrack(false);
                  }}
                >
                  My Tasks
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-link"
                  onClick={() => {
                    setClickTrack(true);
                  }}
                >
                  Tracker
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {clickTrack ? (
        <div className="tracker-div">
          <Tracker />
        </div>
      ) : (
        <div className="mainpage">
          <MainPage tdm={tdm} />
        </div>
      )}
    </div>
  );
}

export default NavBar;
