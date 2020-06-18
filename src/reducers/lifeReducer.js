import { INITIALIZE_GRID } from "../actions";
const initialState = {
  grid: []
};

const lifeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      const { gridX, gridY } = action.payload;
      const gridMatrix = [];
      for (let i = 0; i < gridX; i++) {
        gridMatrix.push(new Array(gridY));
        for (let j = 0; j < gridY; j++) {
          gridMatrix[i][j] = `${i},${j}`;
        }
      }

      return {
        ...state,
        grid: gridMatrix
      };
    default:
      return state;
  }
};

export default lifeReducer;
