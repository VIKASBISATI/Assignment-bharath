import {
    SET_PERSONAL_DATA,
  } from "./types";
  
  const initialState = {
    personalDetails: [],
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PERSONAL_DATA:
        return {
          ...state,
          personalDetails: action.payload,
        };
      default:
        return state;
    }
  };
  export default dataReducer;