import Metaverse from "metaversejs";
import { CREATE_WALLET } from "./types";

export const createWallet = (mnemonic, avatar) => async dispatch => {
  dispatch({
    type: CREATE_WALLET,
    payload: [mnemonic, avatar]
  });
};
