import {
  INITIALIZE_GRID,
  ANIMATE_GAME,
  MODIFY_GRID,
  CHOOSE_PRESET
} from "../actions";

const initialState = {
  grid1: [],
  grid2: [],
  swapGrid: false,
  x: 0,
  y: 0
  //property that holds all the alive cells for easy access?
};

const checkNeighbors = (rowIndex, colIndex, x, y, arr) => {
  const neighbours = [
    [rowIndex - 1, colIndex - 1],
    [rowIndex - 1, colIndex],
    [rowIndex - 1, colIndex + 1],
    [rowIndex, colIndex - 1],
    [rowIndex, colIndex + 1],
    [rowIndex + 1, colIndex - 1],
    [rowIndex + 1, colIndex],
    [rowIndex + 1, colIndex + 1]
  ];

  neighbours.forEach((neighbor, index) => {
    if (
      neighbor[0] >= 0 &&
      neighbor[0] < x &&
      neighbor[1] >= 0 &&
      neighbor[1] < y
    ) {
      neighbours[index] = arr[neighbor[0]][neighbor[1]].alive;
    } else {
      neighbours[index] = false;
    }
  });

  return neighbours;
};

const aliveOrDead = (count, status) => {
  if (count >= 2) {
    //alive if alive otherwise remains dead
    if (count === 3) {
      //alive no matter what
      status = true;
    }

    if (count > 3) {
      //dead
      status = false;
    }
  } else {
    //dead
    status = false;
  }
  return status;
};

const initializeGrid = (gridX, gridY) => {
  const gridMatrix = [];
  for (let i = 0; i < gridX; i++) {
    gridMatrix.push(new Array(gridY));
    for (let j = 0; j < gridY; j++) {
      // gridMatrix[i][j] = `${i},${j}`;

      gridMatrix[i][j] = {
        alive: false
      };
    }
  }

  return gridMatrix;
};

const lifeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      const { gridX, gridY } = action.payload;

      return {
        ...state,
        grid1: initializeGrid(gridX, gridY),
        swapGrid: true,
        x: gridX,
        y: gridY
      };

    case ANIMATE_GAME:
      let currentGrid = null;
      let nextGrid = [];

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }
      state[currentGrid].forEach((currentRow, rowIndex) => {
        nextGrid.push([]);
        currentRow.forEach((currentColumn, colIndex) => {
          let count = 0;
          const neighborBool = checkNeighbors(
            rowIndex,
            colIndex,
            state.x,
            state.y,
            state[currentGrid]
          );
          neighborBool.forEach((val) => {
            if (val) {
              //counts number of true neighbors
              count++;
            }
          });
          nextGrid[rowIndex].push({
            alive: aliveOrDead(count, currentColumn.alive)
          });
        });
      });

      if (state.swapGrid) {
        return {
          ...state,
          grid2: nextGrid,
          swapGrid: false
        };
      } else {
        return {
          ...state,
          grid1: nextGrid,
          swapGrid: true
        };
      }
    // return {
    //   ...state,
    //   [currentGrid]: nextGrid,
    //   swapGrid: !state.swapGrid
    // };

    case MODIFY_GRID: {
      const { modifyRow, modifyCol } = action.payload;
      let currentGrid = null;
      let nextGrid = [];

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }

      for (let i = 0; i < state[currentGrid].length; i++) {
        nextGrid.push([]);
        for (let j = 0; j < state[currentGrid][i].length; j++) {
          if (i === modifyRow && j === modifyCol) {
            nextGrid[i].push({ alive: !state[currentGrid][i][j].alive });
          } else {
            nextGrid[i].push({ alive: state[currentGrid][i][j].alive });
          }
        }
      }

      return {
        ...state,
        [currentGrid]: nextGrid
      };
    }

    case CHOOSE_PRESET: {
      let currentGrid = null;

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }
      const presetGrid = initializeGrid(state.x, state.y);

      switch (action.payload) {
        case "box":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 1
          ] = { alive: true };
          break;
        case "beehive":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) - 1
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 2
          ] = { alive: true };
          presetGrid[Math.floor(state.x / 2) + 2][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][
            Math.floor(state.y / 2) + 1
          ] = { alive: true };
          break;
        case "loaf":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) - 1
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 3][
            Math.floor(state.y / 2) + 1
          ] = {
            alive: true
          };
          break;
        case "boat":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][
            Math.floor(state.y / 2) + 1
          ] = {
            alive: true
          };
          break;
        default:
          break;
      }

      return {
        ...state,
        [currentGrid]: presetGrid
      };
    }

    default:
      return state;
  }
};

export default lifeReducer;
