import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
// import { initializeGrid } from "../../actions";

const CellRow = styled.div`
  display: flex;
`;

const CellDiv = styled.div`
  border: 1px solid black;
  padding: 5px;
  min-width: 30px;
  max-width: 30px;
`;

const Grid = (props) => {
  // const { x, y } = props;
  // props.initializeGrid(x, y);
  // const gridMatrix = [];

  return (
    <div>
      {props.grid.map((val, row) => {
        return (
          <CellRow key={row}>
            {val.map((coordinates, col) => {
              return <CellDiv key={col}>{coordinates}</CellDiv>;
            })}
          </CellRow>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    grid: state.grid
  };
};

export default connect(mapStateToProps, null)(Grid);
