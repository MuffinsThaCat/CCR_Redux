import { GET_MITS } from "./types";
// import { getMits } from "../BlockchainLogic/MitLogic";

export const getMitsAction = mits => async dispatch => {
  // const newMit = await issueMIT(mnemonic, symbol);
  // const mnemonic = "orphan nothing dolphin fantasy opinion shop letter ski coral sound fun sail moral abuse unveil glove radio blush young issue oak impact hen tower";

  // const wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");
  // const addresses = await wallet.getAddresses();
  // const mits = await getMits(addresses);

  dispatch({
    type: GET_MITS,
    payload: mits
  });
};
