import { STORE, STORE_ERR_MESSAGE } from "./types";
import { BaseURL } from "./BaseURL";
import axios from "axios";

export const getStoreAction = (hash, crtl) => dispatch => {
  axios
    .get(BaseURL + "/store?hash=" + hash)
    .then(res => {
      dispatch({
        type: STORE,
        payload: res.data //SUCCESS STATUS
      });
      if (res.data) {
        crtl.setState({ loading: false });
        crtl.setState({ contentStatus: false });
      }
    })
    .catch(err => {
      dispatch({
        type: STORE_ERR_MESSAGE,
        payload: err.response.data
      });
      if (err.response.data === "DUPLICATE_ENTRY") {
        crtl.setState({ loading: false });
      }
    });
};
