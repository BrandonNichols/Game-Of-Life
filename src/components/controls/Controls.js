import React from "react";
import { connect } from "react-redux";
import {
  initializeGridAction,
  animateGameAction,
  setModifyAction
} from "../../actions";

const Controls = (props) => {
  let getAnimationId = null;

  function continuallyAnimate() {
    // console.log(`TIMESTAMP: ${timestamp}`);
    props.animateGameAction();
    if (props.modify) {
      getAnimationId = requestAnimationFrame(continuallyAnimate);
    }
  }

  return (
    <div>
      <button onClick={() => props.initializeGridAction(25, 25)}>
        Reset Grid
      </button>
      <button onClick={() => props.animateGameAction()}>Next</button>
      <button
        onClick={async () => {
          // if (props.canModify) {
          // props.setModifyAction(false);
          await props.setModify(false);
          await continuallyAnimate();
          // }
        }}
      >
        Start
      </button>
      <button
        onClick={async () => {
          // props.setModifyAction(true);
          await props.setModify(true);
          cancelAnimationFrame(getAnimationId);
          // return;
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
