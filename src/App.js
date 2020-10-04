import React, { useState } from "react";
import "./App.css";
import Grid from "./components/grid-area/Grid";
import Controls from "./components/controls/Controls";
import Configurations from "./components/preset-configurations/Configurations";
import styled from "styled-components";

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  height: 100vh;
  max-width: 100vw;
`;

function App() {
  const [modify, setModify] = useState(true);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <GridArea>
        <Configurations showModal={showModal} setShowModal={setShowModal} />
        <Controls
          modify={modify}
          setModify={setModify}
          setShowModal={setShowModal}
        />
        <Grid modify={modify} />
      </GridArea>
    </div>
  );
}

export default App;
