import React, { useState } from "react";
import "../style/Tracker.css";
import { FaSearch } from "react-icons/fa";
import TaskDoneManager from "../components/TaskDoneManager";
import History from "../components/History";

function Tracker() {
  const tdm = new TaskDoneManager();
  const [searchRes, setSearchRes] = useState([]);

  console.log(searchRes);
  return (
    <div className="Tracker ">
      <h1 className="task-history">Task</h1>
      Please input exact full task
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tdm.searchDoneWord(e.target.searchword.value, setSearchRes);
        }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search keyword"
            aria-label="Search keyword"
            aria-describedby="basic-addon2"
            name="searchword"
          />
          <div className="input-group-append">
            <button className="btn" id="search-addon" type="submit">
              SEARCH
              <FaSearch
                className="search-icon"
                style={{ color: "blue" }}
                size={25}
              />
            </button>
          </div>
        </div>
      </form>
      <div
        id="date-picker"
        className="md-form md-outline input-with-post-icon datepicker"
        inline="true"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const queryDate = e.target.datename.value;
            const newDate = queryDate.replaceAll("-", "/");
            tdm.searchDoneDate(newDate, setSearchRes);
          }}
        >
          <input
            placeholder="Select date"
            type="date"
            id="example"
            name="datename"
            className="form-control"
          />
          <label htmlFor="example" className="button">
            <button className="btn search-button" type="submit">
              {" "}
              Search by Date{" "}
              <FaSearch
                className="search-icon"
                id="icon2"
                style={{ color: "blue" }}
                size={25}
              />
            </button>
          </label>
        </form>
      </div>
      <History searchRes={searchRes} />
    </div>
  );
}

export default Tracker;
