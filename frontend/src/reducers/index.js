import { combineReducers } from "redux";
import change from "./change";
import profile from "./profile";

const rootReducer = combineReducers({
  change,
  profile,
});
export default rootReducer;
