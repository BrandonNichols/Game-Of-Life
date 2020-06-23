import React, { useState } from "react";
import "./App.css";
import Grid from "./components/grid-area/Grid";
import Controls from "./components/controls/Controls";
import styled from "styled-components";

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [modify, setModify] = useState(false);
  return (
    <div className="App">
      <GridArea>
        <Controls modify={modify} setModify={setModify} />
        <Grid modify={modify} />
      </GridArea>
    </div>
  );
}

export default App;
