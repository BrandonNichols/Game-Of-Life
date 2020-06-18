export const INITIALIZE_GRID = "INITIALIZE_GRID";

export const initializeGrid = (gridX, gridY) => (dispatch) => {
  dispatch({ type: INITIALIZE_GRID, payload: { gridX, gridY } });
};
