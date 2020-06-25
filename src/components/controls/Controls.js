import React, { useState } from "react";
import { connect } from "react-redux";
import {
  initializeGridAction,
  animateGameAction,
  randomizeGridAction
} from "../../actions";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid white;
  background: black;
  color: white;
  font-family: "Press Start 2P", cursive;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
`;

const Controls = (props) => {
  let getAnimationId = React.useRef();
  let start;
  const [initialized, setInitialized] = useState(false);

  function continuallyAnimate(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (elapsed > 150) {
      props.animateGameAction();
      start = timestamp;
    }
    getAnimationId.current = requestAnimationFrame(continuallyAnimate);
  }

  if (!initialized) {
    props.initializeGridAction(25, 60);
    setInitialized(true);
  }

  return (
    <ButtonContainer>
      <Button onClick={() => props.setShowModal((prevState) => !prevState)}>
        Select Preset Configuration
      </Button>
      <Button
        onClick={() => {
          props.randomizeGridAction();
          cancelAnimationFrame(getAnimationId.current);
          props.setModify(true);
        }}
      >
        Random Grid
      </Button>
      <Button
        onClick={() => {
          cancelAnimationFrame(getAnimationId.current);
          props.setModify(true);
          props.initializeGridAction(25, 60);
        }}
      >
        Reset Grid
      </Button>
      <Button onClick={() => props.animateGameAction()}>Next</Button>
      <Button
        onClick={() => {
          props.setModify(false);
          getAnimationId.current = requestAnimationFrame(continuallyAnimate);
        }}
      >
        Start
      </Button>
      <Button
        onClick={() => {
          props.setModify(true);
          cancelAnimationFrame(getAnimationId.current);
        }}
      >
        Stop
      </Button>
    </ButtonContainer>
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
  randomizeGridAction
})(Controls);
