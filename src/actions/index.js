export const INITIALIZE_GRID = "INITIALIZE_GRID";
export const ANIMATE_GAME = "ANIMATE_GAME";
export const MODIFY_GRID = "MODIFY_GRID";
export const CAN_MODIFY = "CAN_MODIFY";

export const initializeGridAction = (gridX, gridY) => (dispatch) => {
  dispatch({ type: INITIALIZE_GRID, payload: { gridX, gridY } });
};

export const animateGameAction = () => (dispatch) => {
  dispatch({ type: ANIMATE_GAME });
};

export const modifyGridAction = (modifyRow, modifyCol) => (dispatch) => {
  dispatch({ type: MODIFY_GRID, payload: { modifyRow, modifyCol } });
};

export const setModifyAction = (status) => (dispatch) => {
  dispatch({ type: CAN_MODIFY, payload: status });
};
