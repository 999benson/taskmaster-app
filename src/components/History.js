import React from "react";
import "../style/History.css";
import PropTypes from "prop-types";

function History({ searchRes }) {
  return (
    <div className="History">
      <div className="history-box">
        <h1 className="search-result">Search Result</h1>
        {searchRes[0] !== null && searchRes.length > 0
          ? searchRes.map((data, i) => (
              <div key={i} className="data-row">
                Task: {data.text}
                <br />
                <br />
                Date: {data.date}
                {console.log("DATA in HISTORY", data)}
              </div>
            ))
          : "No Result"}
      </div>
    </div>
  );
}

History.propTypes = {
  searchRes: PropTypes.array.isRequired,
};
export default History;
