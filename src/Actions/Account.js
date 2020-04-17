import { CREATE_ACCOUNT } from "./types";

export const updateAccount = account => async dispatch => {
  dispatch({
    type: CREATE_ACCOUNT,
    payload: account
  });
};
