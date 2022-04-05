import { combineReducers } from "redux";
import change from "./change";
import userData from "./userData";

const rootReducer = combineReducers({
  change,
  userData,
});
export default rootReducer;
