import { combineReducers } from "redux";
import change from "./change";
import welData from "./welData";

const rootReducer = combineReducers({
  change,
  welData,
});
export default rootReducer;
