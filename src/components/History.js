import React from "react";
import "../style/History.css";
import PropTypes from "prop-types";

function History({ searchRes }) {
  return (
    <div className="History">
      <div className="history-box">
        <h1 className="search-result">Search Result</h1>
        {searchRes.map((data, i) => (
          <div key={i} className="data-row">
            {data}
            {console.log(data)}
          </div>
        ))}
      </div>
    </div>
  );
}

History.propTypes = {
  searchRes: PropTypes.array.isRequired,
};
export default History;
