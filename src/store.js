import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/auth.reducer";
import loadReducer from "./reducers/load.reducer";
import navReducer from "./reducers/nav.reducer";

const store = createStore(
  combineReducers({ authReducer, loadReducer, navReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
