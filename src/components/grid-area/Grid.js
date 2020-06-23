import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { modifyGridAction } from "../../actions";

const CellRow = styled.div`
  display: flex;
  min-height: 100%;
  min-width: 100%;
`;

const CellDiv = styled.div`
  border: 1px solid black;
  padding: 5px;
  min-width: 30px;
  min-height: 30px;
  ${(props) => (props.alive ? "background: black;" : "background: white;")}
`;

const Grid = (props) => {
  // const { x, y } = props;
  // props.initializeGrid(x, y);
  // const gridMatrix = [];

  const modifyGrid = (row, col) => {
    if (props.modify) {
      props.modifyGridAction(row, col);
    }
  };

  return (
    <div>
      {props.grid
        ? props.grid.map((val, row) => {
            return (
              <CellRow key={row}>
                {val.map((cell, col) => {
                  return (
                    <CellDiv
                      key={col}
                      alive={cell.alive}
                      onClick={() => modifyGrid(row, col)}
                    ></CellDiv>
                  );
                })}
              </CellRow>
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    grid: state.swapGrid ? state.grid1 : state.grid2,
    canModify: state.canModify
  };
};

export default connect(mapStateToProps, { modifyGridAction })(Grid);
