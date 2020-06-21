import { INITIALIZE_GRID, ANIMATE_GAME } from "../actions";
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
      // if (rowIndex === 0 && colIndex === 1) {
      //   console.log(`--CHECK THIS-- ${rowIndex},${colIndex} ${status}`);
      // }
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

const lifeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      const { gridX, gridY } = action.payload;
      const gridMatrix = [];
      for (let i = 0; i < gridX; i++) {
        gridMatrix.push(new Array(gridY));
        for (let j = 0; j < gridY; j++) {
          // gridMatrix[i][j] = `${i},${j}`;
          if (
            (i === 0 && j === 1) ||
            (i === 1 && j === 2) ||
            (i === 2 && (j === 0 || j === 1 || j === 2))
          ) {
            gridMatrix[i][j] = {
              alive: true
            };
          } else {
            gridMatrix[i][j] = {
              //property that holds location of neighbors?
              alive: false
            };
          }
        }
      }

      return {
        ...state,
        grid1: gridMatrix,
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
          console.log(neighborBool);
          neighborBool.forEach((val) => {
            if (val) {
              //counts number of true neighbors
              count++;
            }
          });
          // console.log(
          //   `COUNT: ${count} ROW: ${rowIndex} COL: ${colIndex} ALIVE: ${currentColumn.alive}`
          // );
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

    default:
      return state;
  }
};

export default lifeReducer;
