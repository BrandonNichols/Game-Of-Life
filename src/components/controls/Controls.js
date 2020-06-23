import React from "react";
import { connect } from "react-redux";
import {
  initializeGridAction,
  animateGameAction,
  setModifyAction
} from "../../actions";

const Controls = (props) => {
  let getAnimationId = React.useRef();
  let isAnimating = false;

  function continuallyAnimate() {
    props.animateGameAction();
    if (isAnimating) {
      getAnimationId.current = requestAnimationFrame(continuallyAnimate);
    }
  }

  return (
    <div>
      <button onClick={() => props.initializeGridAction(25, 25)}>
        Reset Grid
      </button>
      <button onClick={() => props.animateGameAction()}>Next</button>
      <button
        onClick={() => {
          // if (props.canModify) {
          // props.setModifyAction(false);
          props.setModify(false);
          isAnimating = true;
          continuallyAnimate();
          // }
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          // props.setModifyAction(true);
          props.setModify(true);
          isAnimating = false;
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
  animateGameAction,
  setModifyAction
})(Controls);
