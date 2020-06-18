import React from "react";
import { connect } from "react-redux";
import { initializeGrid } from "../../actions";

const Controls = (props) => {
  return (
    <div>
      <button onClick={() => props.initializeGrid(25, 25)}>Reset Grid</button>
    </div>
  );
};

export default connect(null, { initializeGrid })(Controls);
