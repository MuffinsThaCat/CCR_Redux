import {
  STORE,
  PROVE,
  DOWNLOAD,
  CREATE_WALLET,
  AUTHENTICATION,
  CREATE_ACCOUNT,
  GET_MITS
} from "../Actions/types";

const state = {
  successMsg: "",
  proveSuccessMsg: "", //renders verify page either for URL or to set hash
  downloadSuccessMsg: "",
  avatar: "",
  mnemonic: "",
  mits: [],
  loggedIn: false,
  account: null
};

function ProveitReducer(mState = { ...state }, action) {
  switch (action.type) {
    case STORE:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.successMsg = action.payload;
      }
      return deepCopy(mState);
    case PROVE:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.proveSuccessMsg = action.payload;
      }
      return deepCopy(mState);

    case DOWNLOAD:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.downloadSuccessMsg = action.payload;
      }
      return deepCopy(mState);
    case CREATE_WALLET:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.mnemonic = action.payload[0];
        console.log(action.payload[1], "avatar in action payload");
        mState.avatar = action.payload[1];
      }
      return deepCopy(mState);
    case AUTHENTICATION:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.loggedIn = action.payload;
      }
      return deepCopy(mState);
    case CREATE_ACCOUNT:
      if (action.payload === undefined) {
      } else {
        mState.account = action.payload;
      }
      return deepCopy(mState);
    case GET_MITS:
      if (action.payload === undefined || action.payload === null) {
      } else {
        mState.mits = action.payload;
      }
      return deepCopy(mState);
    default:
      return deepCopy(mState);
  }
}

const deepCopy = obj => {
  const newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
};
export default ProveitReducer;
