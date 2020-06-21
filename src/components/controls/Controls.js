import React from "react";
import { connect } from "react-redux";
import { initializeGridAction, animateGameAction } from "../../actions";

const Controls = (props) => {
  return (
    <div>
      <button onClick={() => props.initializeGridAction(25, 25)}>
        Reset Grid
      </button>
      <button onClick={() => props.animateGameAction()}>Next</button>
    </div>
  );
};

export default connect(null, { initializeGridAction, animateGameAction })(
  Controls
);
