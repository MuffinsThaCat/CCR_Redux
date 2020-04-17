import { combineReducers } from "redux";
import ProveitReducer from "./proveItReducer";
import ProveitErrorReducer from "./proveItErrorReducer";

const rootReducer = combineReducers({
  ProveitReducer,
  ProveitErrorReducer
});

export default rootReducer;
