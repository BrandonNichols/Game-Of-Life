import React from "react";
import { connect } from "react-redux";
import { initializeGridAction, animateGameAction } from "../../actions";

const Controls = (props) => {
  let getAnimationId = null;

  function continuallyAnimate() {
    props.animateGameAction();
    getAnimationId = requestAnimationFrame(continuallyAnimate);
  }

  return (
    <div>
      <button onClick={() => props.initializeGridAction(25, 25)}>
        Reset Grid
      </button>
      <button onClick={() => props.animateGameAction()}>Next</button>
      <button onClick={() => continuallyAnimate()}>Start</button>
      <button onClick={() => cancelAnimationFrame(getAnimationId)}>Stop</button>
    </div>
  );
};

export default connect(null, {
  initializeGridAction,
  animateGameAction
})(Controls);
