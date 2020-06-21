export const INITIALIZE_GRID = "INITIALIZE_GRID";
export const ANIMATE_GAME = "ANIMATE_GAME";

export const initializeGridAction = (gridX, gridY) => (dispatch) => {
  dispatch({ type: INITIALIZE_GRID, payload: { gridX, gridY } });
};

export const animateGameAction = () => (dispatch) => {
  dispatch({ type: ANIMATE_GAME });
};
