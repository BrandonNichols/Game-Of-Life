import React from "react";
import "./App.css";
import Grid from "./components/grid-area/Grid";
import Controls from "./components/controls/Controls";
import styled from "styled-components";

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <div className="App">
      <GridArea>
        <Controls />
        <Grid />
      </GridArea>
    </div>
  );
}

export default App;
