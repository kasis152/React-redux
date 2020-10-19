import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer"; //should have been courseReducer but since teha we wrote export "default" so naam change garna payinxa
import apiCallsInProgress from "./apiStatusReducer";
const rootReducer = combineReducers({
  // courses: courses,
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducer;
