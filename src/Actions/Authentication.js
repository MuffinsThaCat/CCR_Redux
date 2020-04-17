import { AUTHENTICATION } from "./types";
// import { updateItem } from "../utils/idb";

export const login_out = loggedIn => async dispatch => {
  dispatch({
    type: AUTHENTICATION,
    payload: loggedIn
  });
};
