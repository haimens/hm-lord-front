import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/auth.reducer";
import loadReducer from "./reducers/load.reducer";
import navReducer from "./reducers/nav.reducer";
import locationReducer from "./reducers/location.container";
import contactReducer from "./reducers/contact.container";
const store = createStore(
  combineReducers({ authReducer, loadReducer, navReducer, locationReducer, contactReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
