import { DOWNLOAD, DOWNLOAD_ERR_MESSAGE } from "./types";
import { BaseURL } from "./BaseURL";
import axios from "axios";

export const getDownloadAction = (hash, password, crtl) => dispatch => {
  axios
    .get(BaseURL + "/download?hash=" + hash + "&password=" + password)
    .then(res => {
      dispatch({
        type: DOWNLOAD,
        payload: res.data
      });
      if (res.data) {
        crtl.setState({ loading: false });
      }
    })
    .catch(err => {
      dispatch({
        type: DOWNLOAD_ERR_MESSAGE,
        payload: err.response.data
      });
      if (err.response.data) {
        crtl.setState({ loading: false });
      }
    });
};
