import { SET_PERSONAL_DATA } from "../redux/types";

export const setPersonalData = (details) => (dispatch) => {
  dispatch({ type: SET_PERSONAL_DATA, payload: details });
};
