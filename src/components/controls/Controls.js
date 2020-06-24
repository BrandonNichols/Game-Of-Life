import React, { useState } from "react";
import { connect } from "react-redux";
import { initializeGridAction, animateGameAction } from "../../actions";

const Controls = (props) => {
  let getAnimationId = React.useRef();
  let start;
  const [initialized, setInitialized] = useState(false);

  function continuallyAnimate(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (elapsed > 500) {
      props.animateGameAction();
      start = timestamp;
    }
    getAnimationId.current = requestAnimationFrame(continuallyAnimate);
  }

  if (!initialized) {
    props.initializeGridAction(25, 25);
    setInitialized(true);
  }

  return (
    <div>
      <button onClick={() => props.setShowModal((prevState) => !prevState)}>
        Select Preset Configuration
      </button>
      <button
        onClick={() => {
          cancelAnimationFrame(getAnimationId.current);
          props.setModify(true);
          props.initializeGridAction(25, 25);
        }}
      >
        Reset Grid
      </button>
      <button onClick={() => props.animateGameAction()}>Next</button>
      <button
        onClick={() => {
          props.setModify(false);
          getAnimationId.current = requestAnimationFrame(continuallyAnimate);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          props.setModify(true);
          cancelAnimationFrame(getAnimationId.current);
        }}
      >
        Stop
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    canModify: state.canModify
  };
};

export default connect(mapStateToProps, {
  initializeGridAction,
  animateGameAction
})(Controls);
